import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import auth from "../../services/auth";
import { AuthContext } from "../../contexts/auth";

function Register() {
  const { validation, validating } = useContext(AuthContext);
  //   const [account, setAccount] = useState("uema");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async () => {
    await auth
      .post("/auth/register", {
        username,
        password,
        roles: ["ROLE_USER", "ROLE_ADMIN"],
      })
      .then((response) => {
        console.log(response.data);
        const { username, id } = response.data;
        validation({ name: username, username, id });
      })
      .catch((err) => {
        console.log(err.response ? err.response.data : err);
        Alert.alert("Error", err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Page</Text>

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

      <TouchableOpacity style={styles.button} onPress={createAccount}>
        <Text style={styles.buttonText}>Criar</Text>
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

export default Register;
