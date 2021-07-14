import React, { useContext } from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../services/firebase";
import { AuthContext } from "../../contexts/auth";

function Photo({ manageable, data }) {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  let storageRef = firebase
    .storage()
    .ref()
    .child(`user-${user.username}/base/${data.filename}`);
  let faceListRef = firebase
    .firestore()
    .collection("faceList")
    .doc(user.username);

  const deletePhoto = () => {
    Alert.alert(
      "Deletar",
      "Esta foto será deletada permanentemente. Deseja continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Continuar",
          onPress: () => {
            console.log("Deletando arquivo: " + data.filename);

            faceListRef
              .update({
                facelist: firebase.firestore.FieldValue.arrayRemove(data),
              })
              .then(() => {
                storageRef.delete().catch((deleteFileError) => {
                  console.log(deleteFileError);
                  Alert.alert(
                    "Erro ao deletar arquivo",
                    deleteFileError.message
                  );
                });
              })
              .catch((deleteFaceError) => {
                console.log(deleteFaceError);
                Alert.alert("Erro ao deletar item", deleteFaceError.message);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.push("PhotoDetails", data);
      }}
    >
      <Image style={styles.photo} source={{ uri: data.url }} />

      {manageable && (
        <TouchableOpacity style={styles.deleteContainer} onPress={deletePhoto}>
          <MaterialCommunityIcons
            style={styles.deleteIcon}
            name="delete-forever-outline"
            color={"#CF1A0E"}
            size={40}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

export default Photo;
