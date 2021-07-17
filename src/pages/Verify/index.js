import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";
import faceapi from "../../services/faceapi";
import { AuthContext } from "../../contexts/auth";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Buffer } from "buffer";

function Verify() {
  const { user } = useContext(AuthContext);
  const [photo, setPhoto] = useState(null);
  const [checking, setChecking] = useState(false);

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
      base64: true,
    });

    console.log({ uri: data.uri, fileName: data.width });

    if (data.cancelled || !data.uri) return;

    setPhoto(data);
  };

  const getBufferFromImage = async () => {
    return new Promise((resolve, reject) => {
      try {
        const buff = new Buffer.from(photo.base64, "base64");

        resolve(buff);
      } catch (error) {
        reject(error);
      }
    });
  };

  const verifyFace = async () => {
    console.log("Verificando...");
    setChecking(true);

    try {
      const data = await getBufferFromImage();

      const detectResponse = await faceapi.post("face/v1.0/detect", data, {
        params: {
          detectionModel: "detection_03",
          recognitionModel: "recognition_04",
        },
        headers: {
          "Content-Type": "application/octet-stream",
        },
      });

      console.log("DETECT", detectResponse.data);

      if (detectResponse.data.length !== 1) {
        throw new Error(
          detectResponse.data.length < 1
            ? `Nenhum rosto foi detectado na imagem.`
            : `Somente uma pessoa deve estar na foto. (faces detectadas: ${detectResponse.data.length})`
        );
      }

      const verify_body = {
        faceId: detectResponse.data[0].faceId,
        personId: user.personId,
        largePersonGroupId: "general",
      };

      console.log("verify_body:", verify_body);

      const verifyResponse = await faceapi.post(
        "face/v1.0/verify",
        verify_body
      );

      console.log("VERIFY", verifyResponse.data);

      Alert.alert(
        verifyResponse.data.isIdentical ? "Sucesso" : "Erro",
        `confidence: ${verifyResponse.data.confidence}`
      );
    } catch (e) {
      console.log(e.response ? e.response.data : e.message);
      Alert.alert("Erro", e.message);
    }

    setChecking(false);
  };

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
            {checking && (
              <ActivityIndicator
                style={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  paddingRight: 25,
                }}
                size="small"
                color="#fff"
              />
            )}
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}

export default Verify;
