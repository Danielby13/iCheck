import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { UserContext } from "../context/UserContext";
import AuthStackScreens from "./AuthStackScreens";
import MainStackScreens from "./MainStackScreens";
import LoadingScreen from "../screens/LoadingScreen";

export default AppStackScreens = () => {
  // app stack screen, if user logged in field is true he will transfer to main stack screen else to auth screen
  const AppStack = createStackNavigator();
  const [user] = useContext(UserContext);
  return (
    <AppStack.Navigator headerMode="none">
      {user.isLoggedIn === null ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        <AppStack.Screen name="Main" component={MainStackScreens} />
      ) : (
        <AppStack.Screen name="Auth" component={AuthStackScreens} />
      )}
    </AppStack.Navigator>
  );
};
