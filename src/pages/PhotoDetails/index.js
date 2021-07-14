import React from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";

function PhotoDetails({ route }) {
  const data = route.params;

  return (
    <>
      <AppHeader back />
      <View style={styles.container}>
        <Image
          style={styles.photo}
          source={{ uri: data.url }}
          resizeMode="contain"
        />
      </View>
    </>
  );
}

export default PhotoDetails;
