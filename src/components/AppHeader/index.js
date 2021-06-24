import React, { useContext } from "react";
import { View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles";

function MyHeader({ back }) {
  const { changeUser, user } = useContext(AuthContext);
  const navigation = useNavigation();

  const exit = () => {
    Alert.alert(
      "Desconectar",
      "Deseja desconectar sua conta?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Desconectar",
          onPress: () => {
            Alert.alert("Pronto!", "Você foi desconectado.");
            changeUser(null);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BorderlessButton
          onPress={() => {
            back
              ? navigation.goBack()
              : Alert.alert("Não implementado", "blacks");
          }}
        >
          <MaterialCommunityIcons
            name={back ? "arrow-left" : "view-sequential"}
            color={"#fff"}
            size={26}
          />
        </BorderlessButton>

        <Text
          style={styles.headerText}
        >{`user: ${user.name} (${user.username})`}</Text>

        <BorderlessButton onPress={exit}>
          <MaterialCommunityIcons name="exit-to-app" color={"#fff"} size={26} />
        </BorderlessButton>
      </View>
    </View>
  );
}

export default MyHeader;
