import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import AppHeader from "../../components/AppHeader";
import firebase from "../../services/firebase";
import { AuthContext } from "../../contexts/auth";

function MyPhotos() {
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [photos, setPhotos] = useState([]);
    let faceListRef = firebase.firestore()
        .collection("faceList")
        .doc(user.username)
    let storageRef = firebase
        .storage()
        .ref()
        .child(`user-${user.username}/base/`)

    useEffect(() => {
        faceListRef
            .onSnapshot((snapshot) => { //trocar por .on ou .get
                console.log(snapshot.data())
                setPhotos(snapshot.data() ? snapshot.data().facelist : [])
                setLoading(false)
            });
    }, [])

    const resetBase = () => {
        Alert.alert(
            "Reset",
            "Isso irá deletar todas as suas fotos atuais. Deseja continuar?",
            [
                {
                    text: "Cancelar",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Continuar",
                    onPress: () => {
                        Alert.alert("Pronto!", "Suas fotos foram deletadas.");
                        storageRef.delete()
                            .then((value) => { console.log("funfou", value) })
                            .catch((err) => { console.log("err0o", err) });
                        faceListRef.update({ facelist: [] })
                    },
                },
            ],
            { cancelable: false }
        );
    }

    return (
        <>
            <AppHeader back />
            {
                loading ?
                    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
                        <ActivityIndicator size="large" color="#f00" />
                    </View>
                    :
                    <>
                        <ScrollView style={styles.container}>
                            <Text style={styles.text}>Base de Fotos: {photos.length} foto(s)</Text>

                            <View style={styles.photosContainer}>
                                {photos.map((item, i) =>
                                    <Image
                                        key={i.toString()}
                                        style={styles.photo}
                                        source={{ uri: item }}
                                    />
                                )}
                                {photos.length < 6 &&
                                    <TouchableOpacity
                                        style={styles.addPhotoButton}
                                        onPress={() => { navigation.push("AddPhoto") }}
                                    >
                                        <MaterialCommunityIcons name="camera-plus-outline" color={"#888"} size={60} />
                                    </TouchableOpacity>}
                            </View>
                        </ScrollView>

                        <TouchableOpacity style={styles.button} onPress={resetBase}>
                            <Text style={styles.buttonText}>Reset</Text>
                            <MaterialCommunityIcons name="delete-forever-outline" color={"#fff"} size={25} />
                        </TouchableOpacity>
                    </>
            }
        </>
    );
}

export default MyPhotos;
