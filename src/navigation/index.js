// In App.js in a new project

import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import WelcomeScreen from "../screen/WelcomeScreen";
import RecepieDetail from "../screen/RecepieDetail";

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecepieDetail" component={RecepieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
