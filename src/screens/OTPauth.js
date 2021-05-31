// import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from "react";
import { FirebaseContext } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import Text from "../components/Text";
import { Image } from "react-native";

export default otpAuth = () => {
  // part of the sign up page, the user need to vallidate his phone number by sending OTP to his mobile page
  const [value, onChangeText] = useState("");
  const firebase = useContext(FirebaseContext);
  const [generateNumberAgain, setGenerateNumberAgain] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const [user, setUser] = useContext(UserContext);
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingOTP, setLoadingOTP] = useState(false);
  const [tempUser, setTempUser] = useContext(UserContext);
  const apiUrl =
    "*********"; // Censored due to sensitive information

  const sendOTPagain = async () => {
    // if the user cant find the OTP on his mobile, the function sends OTP again
    try {
      await fetch(apiUrl + generateNumberAgain);
      tempUser.generateNumber = generateNumberAgain;
    } catch (err) {
      console.log("Error fetching data-----------", err);
      return;
    }
  };

  const check = async () => {
    // check if the user insert the right OTP and finally create the user
    setLoading(true);

    try {
      if (value == tempUser.generateNumber) {
        setActive("1");
        const createdUser = await firebase.createUser(tempUser);
        if (createdUser == null) return;
        setUser({ ...createdUser, active: "1", isLoggedIn: true });
      } else {
        alert("קוד שגוי");
        return;
      }
    } catch (error) {
      console.log("Error fetching data-----------", err);
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Main>
        <Text large center>
          הכניסו קוד בן 4 ספרות
        </Text>
      </Main>
      <Auth>
        <AuthContainer>
          <AuthField
            autoCapotalize="none"
            autoCorrect={false}
            autoFocus={true}
            onChangeText={(text) => onChangeText(text)}
            value={value}
          />
        </AuthContainer>
      </Auth>

      <SignUpContainer onPress={check} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            אישור קוד
          </Text>
        )}
      </SignUpContainer>

      <OTPContainer onPress={sendOTPagain} disabled={loadingOTP}>
        {loadingOTP ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            לא קיבלתם קוד? לחצו כאן לשליחה מחודשת
          </Text>
        )}
      </OTPContainer>

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
  margin-top: 250px;
`;
const Auth = styled.View`
  margin: 10px 32px 10px;
`;

const AuthContainer = styled.View`
  margin-bottom: 32px;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
  text-align: center;
`;

const OTPContainer = styled.TouchableOpacity`
  margin: 240px 32px;
  height: 35px;
  align-items: center;
  justify-content: center;
  background-color: #cccccc;
  border-radius: 6px;
`;

const SignUpContainer = styled.TouchableOpacity`
  margin: 0 32px;
  height: 48px;
  align-items: center;
  justify-content: center;
  background-color: #54c9cd;
  border-radius: 6px;
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

const LeftCircle = styled.View`
  background-color: #23a6d5;
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  left: -50px;
  top: -50px;
`;

const HeaderLogo = styled.View`
  width: 200px;
  height: 200px;
  left: 30px;
  top: 140px;
`;

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;

const StatusBar = styled.StatusBar``;
