import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpscreen from "../screens/SignUpScreen";
import OTPauth from "../screens/OTPauth";

export default function AuthStackScreens() {
  // the user can choose to login or sign up
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SignIn" component={SignInScreen} />

      <AuthStack.Screen name="SignUp" component={SignUpScreen} />

      <AuthStack.Screen name="OTPauth" component={OTPauth} />
    </AuthStack.Navigator>
  );
}
