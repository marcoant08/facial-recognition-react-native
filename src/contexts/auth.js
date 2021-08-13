import React, { createContext, useState, useEffect } from "react";
import { Alert } from "react-native";
import { FIRESTORE_COLLECTION } from "@env";
import firebase from "../services/firebase";
import faceapi from "../services/faceapi";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validating, setValidating] = useState(false);
  let faceListRef = firebase.firestore().collection(FIRESTORE_COLLECTION);

  useEffect(() => {
    setLoading(false);
  }, []);

  const validation = async (user) => {
    if (!user.username || !user.name || !user.id) {
      Alert.alert("Error", "Invalid user data");
      return;
    }

    setValidating(true);

    await faceListRef
      .doc(user.username)
      .get()
      .then(async (value) => {
        console.log("DOCUMENT", value.data());

        if (!value.data()?.personId) {
          await createPerson(user).then((personId) => {
            setUser({ ...user, personId });
          });
        } else {
          setUser({ ...user, personId: value.data().personId });
        }
      })
      .catch((err) => {
        console.log("ERR", err);
        Alert.alert("Erro", err.message);
      });

    setValidating(false);
  };

  const createPerson = async (user) => {
    console.log("CRIANDO PERSON...");
    return new Promise(async (resolve, reject) => {
      try {
        const createPersonResponse = await faceapi.post(
          "face/v1.0/largepersongroups/general/persons",
          {
            name: user.username,
            userData: user.email,
          }
        );

        console.log(createPersonResponse.data);

        await faceListRef
          .doc(user.username)
          .set({
            facelist: [],
            personId: createPersonResponse.data.personId,
          })
          .then((value) => {
            console.log(value);
            console.log("Sucesso ao salvar personId no firestore");
          })
          .catch((err) => {
            throw err;
          });

        resolve(createPersonResponse.data.personId);
      } catch (e) {
        reject(e);
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!user,
        user,
        validation,
        validating,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
