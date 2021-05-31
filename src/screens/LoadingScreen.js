import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import Text from "../components/Text";
import { FirebaseContext } from "../context/FirebaseContext";

export default LoadingScreen = () => {
  // loading screen
  const [_, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();

      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);
        setUser({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          username: userInfo.username,
        });
      } else {
        setUser((state) => ({ ...state, isLoggedIn: false }));
      }
    }, 0);
  }, []);
  return (
    <Container>
      <Text title color="#FFFFFF">
        iCheck App
      </Text>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #222222;
`;
