import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/Login";

const AuthStack = createStackNavigator();

function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
}

export default AuthRoutes;
