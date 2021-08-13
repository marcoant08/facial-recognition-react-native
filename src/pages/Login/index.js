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
import styles from "./styles";
import auth from "../../services/auth";
import { AuthContext } from "../../contexts/auth";
import { useNavigation } from "@react-navigation/native";

function Login() {
  const { validation, validating } = useContext(AuthContext);
  const [account, setAccount] = useState("uema");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const unmounted = useRef(false);
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const authenticate = async () => {
    console.log("authenticate()");
    await auth
      .post("/auth/login", { username, password })
      .then((response) => {
        console.log(response.data);
        const { username, id } = response.data;
        validation({ name: username, username, id });
      })
      .catch((err) => {
        console.log(err.response ? err.response : err);
        Alert.alert("Error", err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>

      {/* <Picker
        selectedValue={account}
        style={styles.picker}
        onValueChange={setAccount}
      >
        <Picker.Item label="UEMA" value="uema" />
        <Picker.Item label="Outlook" value="outlook" />
        <Picker.Item label="Yahoo!" value="yahoo" />
      </Picker> */}

      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        value={username}
        placeholder="Username"
      />

      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={authenticate}>
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

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => {
          navigation.push("Register");
        }}
      >
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
    </View>
  );
}

export default Login;
