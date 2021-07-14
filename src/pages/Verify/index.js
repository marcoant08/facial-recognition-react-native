import React, { useContext, useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";
import firebase from "../../services/firebase";
import { AuthContext } from "../../contexts/auth";

function Verify() {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [transferred, setTransferred] = useState(0);

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
        .ref(`user-${user.username}/verify/foto-${fileName}`);

      storageRef.put(blob).on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const percentage = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(2);

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
            await salvarDados(downloadUrl)
          });

          Alert.alert("Sucesso!", "Foto enviada.");

          setPhoto(null);
        }
      );
    }
  };

  const salvarDados = async (downloadUrl) => {
    await firebase
      .firestore()
      .collection("faceList")
      .doc(user.username)
      .update({
        facelist: firebase.firestore.FieldValue.arrayUnion(downloadUrl)
      })
      .then((value) => {
        console.log(value)
        Alert.alert("Sucesso", "Salvo!")
      })
      .catch((err) => {
        Alert.alert("Erro", err.message)
      });
  }

  return (
    <>
      <AppHeader back />
      <View style={styles.container}>
        <Text style={styles.text}>Verify Page</Text>

        <Text style={styles.text}>{photo ? photo.uri.substr(-40) : "no photo"}</Text>

        <Image
          style={styles.photo}
          source={{
            uri: photo
              ? photo.uri
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png",
          }}
        />

        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={uploadPhoto}>
          <Text style={styles.buttonText}>Enviar Foto</Text>
        </TouchableOpacity>

        <Text style={styles.text}>{transferred}%</Text>
      </View>
    </>
  );
}

export default Verify;
