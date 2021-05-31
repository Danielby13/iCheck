import React, { useContext } from "react";
import styled from "styled-components";
import { StyleSheet, Text, View, Button } from "react-native";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

export default LogOut = () => {
  // log out the user from our app
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const logOut = async () => {
    const loggedOut = await firebase.logOut();
    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };
  return (
    <View>
      <Text>
        לידיעתך, התנתקות אינה מוחקת את פרטי החשבון.{"\n"}
        תוכל להתחבר שוב בכל עת.{"\n"}
        לחץ כאן על מנת להתנתק מהאפליקציה:{"\n"}
        {"\n"}
        <Button
          onPress={logOut}
          title="התנתקות"
          color="red"
          accessibilityLabel="Learn more about this purple button"
        />
      </Text>
    </View>
  );
};
