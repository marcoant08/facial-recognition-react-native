import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../pages/Home";
import Verify from "../pages/Verify";
import MyPhotos from "../pages/MyPhotos";
import AddPhoto from "../pages/AddPhoto";

const AppStack = createStackNavigator();

function AppRoutes() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={Home} />
      <AppStack.Screen name="Verify" component={Verify} />
      <AppStack.Screen name="MyPhotos" component={MyPhotos} />
      <AppStack.Screen name="AddPhoto" component={AddPhoto} />
    </AppStack.Navigator>
  );
}

export default AppRoutes;
