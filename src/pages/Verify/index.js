import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";

function Verify() {
  return (
    <>
      <AppHeader back />
      <View style={styles.container}>
        <Text style={styles.text}>Verify Page</Text>
      </View>
    </>
  );
}

export default Verify;
