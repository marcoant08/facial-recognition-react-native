import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { FIRESTORE_COLLECTION } from "@env";
import styles from "./styles";
import firebase from "../../services/firebase";
import faceapi from "../../services/faceapi";
import { AuthContext } from "../../contexts/auth";

function Login() {
  const { changeUser } = useContext(AuthContext);
  const [validating, setValidating] = useState(false);
  const [account, setAccount] = useState("uema");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const unmounted = useRef(false);
  let faceListRef = firebase.firestore().collection(FIRESTORE_COLLECTION);

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const validation = async (user) => {
    setValidating(true);

    await faceListRef
      .doc(user.username)
      .get()
      .then(async (value) => {
        console.log("DOCUMENT", value.data());

        if (!value.data()?.personId) {
          await createPerson(user).then((personId) => {
            changeUser({ ...user, personId });
          });
        } else {
          changeUser({ ...user, personId: value.data().personId });
        }
      })
      .catch((err) => {
        console.log("ERR", err);
        Alert.alert("Erro", err.message);
      });

    if (!unmounted.current) setValidating(false);
  };

  const createPerson = async (user) => {
    console.log("CRIANDO PERSON...");
    return new Promise(async (resolve, reject) => {
      try {
        const createPersonResponse = await faceapi.post(
          "face/v1.0/largepersongroups/general/persons",
          {
            name: user.username,
            userData: user.email,
          }
        );

        console.log(createPersonResponse.data);

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
            throw err;
          });

        resolve(createPersonResponse.data.personId);
      } catch (e) {
        reject(e);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>

      <Picker
        selectedValue={account}
        style={styles.picker}
        onValueChange={setAccount}
      >
        <Picker.Item label="UEMA" value="uema" />
        <Picker.Item label="Outlook" value="outlook" />
        <Picker.Item label="Yahoo!" value="yahoo" />
      </Picker>

      <TextInput
        style={styles.input}
        onChange={setUsername}
        value={username}
        placeholder="Username"
      />

      <TextInput
        style={styles.input}
        onChange={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Entrar</Text>
        {validating && (
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

      <TouchableOpacity style={styles.buttonRegister} onPress={() => {}}>
        <Text style={styles.buttonRegisterText}>Criar conta</Text>
        {validating && (
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

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => {
          validation({
            name: "Marco Antônio",
            username: "marcoant08",
            id: 102,
          });
        }}
      >
        <Text style={styles.buttonRegisterText}>Marco Antônio</Text>
        {validating && (
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

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => {
          validation({
            name: "Neymar Jr",
            username: "neyjr",
            id: 103,
          });
        }}
      >
        <Text style={styles.buttonRegisterText}>Neymar Jr</Text>
        {validating && (
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

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => {
          validation({
            name: "Alzira",
            username: "alzira",
            id: 104,
          });
        }}
      >
        <Text style={styles.buttonRegisterText}>Alzira</Text>
        {validating && (
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
    </View>
  );
}

export default Login;
