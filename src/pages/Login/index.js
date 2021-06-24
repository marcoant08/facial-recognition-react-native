import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { AuthContext } from "../../contexts/auth";

function Login() {
  const { changeUser } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          changeUser({
            name: "Marco Antônio",
            username: "marcoant08",
          });
        }}
      >
        <Text style={styles.buttonText}>Marco Antônio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          changeUser({
            name: "Neymar Jr",
            username: "neyjr",
          });
        }}
      >
        <Text style={styles.buttonText}>Neymar Jr</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;
