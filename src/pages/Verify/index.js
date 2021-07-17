import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// import { FIRESTORE_COLLECTION } from "@env";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";
import faceapi from "../../services/faceapi";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// require('buffer').Buffer

function Verify() {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);

  // useEffect(() => {
  //   faceListRef.onSnapshot((snapshot) => {
  //     //trocar por .on ou .get
  //     console.log(snapshot.data());
  //     setFaceListExists(snapshot.data() ? true : false);
  //   });
  // }, []);

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

  const getData = async () => {
    return new Promise(async (resolve, reject) => {
      try {

        // console.log("URI: ", photo.uri)

        // const response = await fetch(photo.uri);
        // console.log(response)

        // const blob = await response.blob()

        // console.log("blob", blob)

        // resolve(blob)
        var binaryDataInBase64 = new FormData();// TENTAR SUBSTITUIR FETCH POR AXIOS
        binaryDataInBase64.append({
          uri: Constants.platform.ios ? 'file://' + photo.uri : photo.uri,
          name: photo.filename,
          type: 'image/jpeg'
        })

        console.log(binaryDataInBase64)
        resolve(binaryDataInBase64)

      } catch (error) {
        reject(error)
      }
    })
  }

  const verifyFace = async () => {
    console.log("Verificandoo0...")
    // const data = await fetch(photo.uri)//.then((value) => console.log("POK", value)).catch(() => console.log("AAA"));

    try {
      const data = await getData()

      const detectResponse = await faceapi.post("face/v1.0/detect",
        data,
        {
          params: {
            detectionModel: "detection_03",
            recognitionModel: "recognition_04"
          },
          headers: {
            "Content-Type": "application/octet-stream"
          }
        })

      console.log("detect", detectResponse.data)
    } catch (e) {
      console.log(e.response ? e.response.data : e.message)
      Alert.alert("Erro", e.message)
    }
  }

  return (
    <>
      <AppHeader back />
      <View style={styles.container}>
        <Text style={styles.text}>Verificação Facial</Text>

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

        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>
            {!photo ? "Tirar Foto" : "Tirar Outra Foto"}
          </Text>
        </TouchableOpacity>

        {photo && (
          <TouchableOpacity style={styles.button} onPress={verifyFace}>
            <Text style={styles.buttonText}>Verificar</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default Verify;
