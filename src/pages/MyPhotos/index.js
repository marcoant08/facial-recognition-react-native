import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";
import firebase from "../../services/firebase";
import { AuthContext } from "../../contexts/auth";
import Photo from "../../components/Photo";

function MyPhotos() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [manageable, setManageable] = useState(false);
  const [photos, setPhotos] = useState([]);
  let faceListRef = firebase
    .firestore()
    .collection("faceList")
    .doc(user.username);

  useEffect(() => {
    faceListRef.onSnapshot((snapshot) => {
      //trocar por .on ou .get
      console.log(snapshot.data());
      setPhotos(snapshot.data() ? snapshot.data().facelist : []);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AppHeader back />
      {loading ? (
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="#f00" />
        </View>
      ) : (
        <>
          <ScrollView style={styles.container}>
            <Text style={styles.text}>
              Base de Fotos: {photos.length} foto(s)
            </Text>

            <View style={styles.photosContainer}>
              {photos.map((item, i) => (
                <Photo key={i.toString()} manageable={manageable} data={item} />
              ))}
              {photos.length < 6 && (
                <TouchableOpacity
                  style={styles.addPhotoButton}
                  onPress={() => {
                    navigation.push("AddPhoto");
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-plus-outline"
                    color={"#888"}
                    size={60}
                  />
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setManageable(!manageable)}
          >
            <Text style={styles.buttonText}>Gerenciar</Text>
            <MaterialCommunityIcons
              name="image-edit-outline"
              color={"#fff"}
              size={25}
            />
          </TouchableOpacity>
        </>
      )}
    </>
  );
}

export default MyPhotos;
