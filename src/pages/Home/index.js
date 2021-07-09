import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";

function Home() {
  const navigation = useNavigation();

  return (
    <>
      <AppHeader />
      <View style={styles.container}>
        <Text style={styles.text}>Home Page</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("Verify");
          }}
        >
          <Text style={styles.buttonText}>Verificação</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("MyPhotos");
          }}
        >
          <Text style={styles.buttonText}>Minhas Fotos</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Home;
