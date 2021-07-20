import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";

function Model() {
  return (
    <>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.text}>Model Page</Text>
      </View>
    </>
  );
}

export default Model;
