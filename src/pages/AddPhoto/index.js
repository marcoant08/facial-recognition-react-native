import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";
import firebase from "../../services/firebase";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AddPhoto() {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [transferred, setTransferred] = useState(0);
  const [sending, setSending] = useState(false);
  const [faceListExists, setFaceListExists] = useState(false);
  const [faceListLength, setFaceListLength] = useState(0);
  let faceListRef = firebase
    .firestore()
    .collection("faceList")
    .doc(user.username);

  useEffect(() => {
    faceListRef.onSnapshot((snapshot) => {
      //trocar por .on ou .get
      console.log(snapshot.data());
      setFaceListExists(snapshot.data() ? true : false);
      setFaceListLength(snapshot.data().facelist.length);
    });
  }, []);

  const openCamera = async () => {
    console.log("Abrindo câmera...");

    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);

      if (status !== "granted") {
        Alert.alert(
          "Permissão",
          "Esta permissão é necessária para abrir a câmera."
        );

        return;
      }
    }

    const data = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log(data);

    if (data.cancelled || !data.uri) return;

    setPhoto(data);
  };

  const uploadPhoto = async () => {
    setSending(true);

    if (!photo) {
      console.log("No photo selected");

      Alert.alert("Tire uma foto", "Nenhuma foto disponível para envio.");

      return;
    } else {
      console.log("Sending photo...");
      // setUploading(true);
      setTransferred(0);

      const fileExtension = photo.uri.split(".").pop();
      console.log("EXT: " + fileExtension);

      const uuid = uuidv4();

      const fileName = `${uuid}.${fileExtension}`;
      console.log("FILENAME: " + fileName);

      const response = await fetch(photo.uri);
      const blob = await response.blob();

      let storageRef = firebase
        .storage()
        .ref(`user-${user.username}/base/foto-${fileName}`);

      storageRef.put(blob).on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const percentage = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0);

          console.log(`Enviando: ${percentage}%`);
          setTransferred(percentage);
        },
        (error) => {
          console.log("Erro:\n", error.message);
          Alert.alert("Ocorreu um erro...", error.message);
        },
        async () => {
          await storageRef.getDownloadURL().then(async (downloadUrl) => {
            console.log("downloadUrl: " + downloadUrl);
            await salvarDados({
              url: downloadUrl,
              filename: `foto-${fileName}`,
            });
          });

          Alert.alert("Sucesso!", "Foto enviada.");

          setPhoto(null);
        }
      );
    }
  };

  const salvarDados = async (data) => {
    if (faceListExists) {
      await faceListRef
        .update({
          facelist: firebase.firestore.FieldValue.arrayUnion(data),
        })
        .then((value) => {
          console.log(value);
          Alert.alert("Sucesso", "Salvo!");
        })
        .catch((err) => {
          Alert.alert("Erro", err.message);
        });
    } else {
      await faceListRef
        .set({
          facelist: [data],
        })
        .then((value) => {
          console.log(value);
          Alert.alert("Sucesso", "Salvo!");
        })
        .catch((err) => {
          Alert.alert("Erro", err.message);
        });
    }

    setTimeout(() => {
      setSending(false);
    }, 2000);
  };

  return (
    <>
      <AppHeader back />
      <View style={styles.container}>
        <Text style={styles.text}>
          Adicione novas fotos à sua base de dados
        </Text>

        {faceListLength >= 6 && (
          <Text style={styles.text}>
            Limite de fotos excedido: {faceListLength} fotos
          </Text>
        )}

        <TouchableOpacity style={styles.photoContainer} onPress={openCamera}>
          {photo ? (
            <Image
              style={styles.photo}
              source={{
                uri: photo.uri,
              }}
            />
          ) : (
            <MaterialCommunityIcons
              name="camera-plus-outline"
              color={"#888"}
              size={60}
            />
          )}
        </TouchableOpacity>

        <View style={styles.infoBox}>
          {sending && (
            <>
              <View style={styles.loaderContainer}>
                {transferred > 1 && (
                  <View
                    style={[
                      styles.loaderContent,
                      {
                        backgroundColor:
                          Number(transferred) === 100 ? "#77dd77" : "#f00",
                        width: `${transferred}%`,
                      },
                    ]}
                  />
                )}
              </View>
              <Text
                style={[
                  styles.text,
                  { color: Number(transferred) === 100 ? "#77dd77" : "#f00" },
                ]}
              >
                {transferred}%
              </Text>
            </>
          )}
        </View>

        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>
            {!photo ? "Tirar Foto" : "Tirar Outra Foto"}
          </Text>
        </TouchableOpacity>

        {photo && (
          <TouchableOpacity style={styles.button} onPress={uploadPhoto}>
            <Text style={styles.buttonText}>Enviar Foto</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default AddPhoto;
