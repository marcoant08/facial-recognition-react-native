import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Verify from "../pages/Verify";

const AppStack = createStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Verify" component={Verify} />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
