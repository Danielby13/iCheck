import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { UserProvider } from "./src/context/UserContext";
import { FirebaseProvider } from "./src/context/FirebaseContext";
import AppStackScreens from "./src/stacks/AppStackScreens";
import FlashMessage from "react-native-flash-message";
export default App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <AppStackScreens />
        </NavigationContainer>
        <FlashMessage position="top" floating={true} />
      </UserProvider>
    </FirebaseProvider>
  );
};
