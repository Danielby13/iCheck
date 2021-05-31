// import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";
import { Image, Linking, Button } from "react-native";

export default SignInScreen = ({ navigation }) => {
  // sign in screen
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signIn = async () => {
    // get user info to log in from the db
    setLoading(true);

    try {
      await firebase.signIn(email, password);

      const uid = firebase.getCurrentUser().uid;
      const userInfo = await firebase.getUserInfo(uid);

      setUser({
        firstName: userInfo.firstName,
        email: userInfo.email,
        uid,
        isLoggedIn: true,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <Main>
        <Text title semi center>
          ברוכים הבאים
        </Text>
      </Main>

      <Auth>
        <AuthContainer>
          <AuthTitle>כתובת אימייל</AuthTitle>
          <AuthField
            autoCapotalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            autoFocus={true}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email.trim())}
            value={email}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>סיסמה</AuthTitle>
          <AuthField
            autoCapotalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password.trim())}
            value={password}
          />
        </AuthContainer>
      </Auth>

      <SignInContainer onPress={signIn} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            כניסה
          </Text>
        )}
      </SignInContainer>

      <SignUp onPress={() => navigation.navigate("SignUp")}>
        <Text small center>
          לא רשום?{" "}
          <Text medium bold color="#54c9cd">
            {" "}
            להרשמה{" "}
          </Text>
        </Text>
      </SignUp>

      <HeaderGraphic>
        <RightCircle />
        {/* <LeftCircle /> */}
        <HeaderLogo>
          <Image
            source={require("../../assets/logo.png")}
            style={{ width: 300, height: 89 }}
          />
        </HeaderLogo>
      </HeaderGraphic>

      <StatusBar barStyle="light-content" />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;
const Main = styled.View`
  margin-top: 192px;
`;
const Auth = styled.View`
  margin: 64px 32px 32px;
`;

const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 800;
  text-align: left;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const SignInContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #54c9cd;
  border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const SignUp = styled.TouchableOpacity`
  margin-top: 16px;
`;

const HeaderGraphic = styled.View`
  position: absolute;
  width: 100%;
  top: -50px;
  z-index: -100;
`;

const RightCircle = styled.View`
  background-color: #ddb0ce;
  position: absolute;
  width: 400px;
  height: 450px;
  border-radius: 200px;
  left: -100px;
  top: -200px;
`;
// background-color: #4abec2;
const LeftCircle = styled.View`
  background-color: #acacac;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const HeaderLogo = styled.View`
  left: 45px;
  top: 130px;
`;

const StatusBar = styled.StatusBar``;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
