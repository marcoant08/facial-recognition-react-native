import { StatusBar } from "expo-status-bar";
import React from "react";
import AuthProvider from "./src/contexts/auth";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar style="light" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
