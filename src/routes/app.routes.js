import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";

const AppStack = createStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
