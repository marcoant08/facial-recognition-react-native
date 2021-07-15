import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View } from "react-native";
import { FIRESTORE_COLLECTION } from "@env";
import styles from "./styles";
import firebase from "../../services/firebase";
import faceapi from "../../services/faceapi";
import { AuthContext } from "../../contexts/auth";

function Login() {
  const { changeUser } = useContext(AuthContext);
  const [validating, setValidating] = useState(false)
  let faceListRef = firebase
    .firestore()
    .collection(FIRESTORE_COLLECTION)

  const validation = async (user) => {
    setValidating(true)

    await faceListRef
      .doc(user.username)
      .get()
      .then(async value => {
        console.log("DOCUMENT", value.data())

        if (!value.data()?.personId) {
          await createPerson(user)
            .then(personId => {
              changeUser({ ...user, personId })
            })
        } else {
          changeUser({ ...user, personId: value.data().personId })
        }
      })
      .catch(err => {
        console.log("ERR", err)
        Alert.alert("Erro", err.message)
      })

    setValidating(false)

  }

  const createPerson = async (user) => {
    console.log("CRIANDO PERSON...")
    return new Promise(async (resolve, reject) => {
      try {
        const createPersonResponse = await faceapi.post("face/v1.0/largepersongroups/general/persons", {
          name: user.username,
          userData: user.email
        })

        console.log(createPersonResponse.data)

        await faceListRef
          .doc(user.username)
          .set({
            facelist: [],
            personId: createPersonResponse.data.personId,
          })
          .then((value) => {
            console.log(value);
            console.log("Sucesso ao salvar personId no firestore");
          })
          .catch((err) => {
            console.log("Erro", err.message);
          });

        resolve(createPersonResponse.data.personId)
      } catch (e) {
        reject(e)
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          validation({
            name: "Marco Antônio",
            username: "marcoant08",
            id: 102,
          });
        }}
      >
        <Text style={styles.buttonText}>Marco Antônio</Text>
        {validating && <ActivityIndicator style={{ position: "absolute", alignSelf: "flex-end", paddingRight: 25 }} size="small" color="#fff" />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          validation({
            name: "Neymar Jr",
            username: "neyjr",
            id: 103,
          });
        }}
      >
        <Text style={styles.buttonText}>Neymar Jr</Text>
        {validating && <ActivityIndicator style={{ position: "absolute", alignSelf: "flex-end", paddingRight: 25 }} size="small" color="#fff" />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          validation({
            name: "Alzira",
            username: "alzira",
            id: 104,
          });
        }}
      >
        <Text style={styles.buttonText}>Alzira</Text>
        {validating && <ActivityIndicator style={{ position: "absolute", alignSelf: "flex-end", paddingRight: 25 }} size="small" color="#fff" />}
      </TouchableOpacity>
    </View>
  );
}

export default Login;
