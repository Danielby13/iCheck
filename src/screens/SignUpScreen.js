// import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { ScrollView } from "react-native";
import { FirebaseContext, FirebaseProvider } from "../context/FirebaseContext";
import { UserContext } from "../context/UserContext";
import { Image, Alert, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";

export default SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [active, setActive] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);
  const [tempUser, setTempUser] = useContext(UserContext);
  const [passwordAuth, setPasswordAuth] = useState();
  const [generateNumber, setGenerateNumber] = useState(
    Math.floor(1000 + Math.random() * 9000)
  );
  const apiUrl =
    "**********"; // Censored due to sensitive information

  const sentOTP = async () => {
    // send OTP
    try {
      await fetch(apiUrl + generateNumber);
    } catch (err) {
      console.log("Error fetching data-----------", err);
      return;
    }
  };

  // validation for the fields

  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const validatePassword = (password) => {
    var re = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})/;
    return re.test(password);
  };
  const validateName = (name) => {
    var re = /^([a-zA-Z]|[a-zA-Z\s]|[א-ת]|[א-ת\s])+$/;
    return re.test(name);
  };
  const validatePhoneNumber = (phoneNumber) => {
    var re = /^[0-9]+\d{9}$/;
    return re.test(phoneNumber);
  };

  const signUp = async () => {
    // insert the data to temp user
    setLoading(true);
    setActive("1");

    const user = {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      active,
      generateNumber,
    };

    try {
      setTempUser(user);
      if (
        user.email == undefined ||
        user.firstName == undefined ||
        user.lastName == undefined ||
        user.phoneNumber == undefined
      ) {
        // validation for the fields
        Alert.alert("שגיאה", "יש למלא את כל השדות", [{ text: "אישור" }], {
          cancelable: false,
        });
        return;
      } else if (!validateEmail(user.email)) {
        Alert.alert(
          "שגיאה בכתובת האימייל",
          "יש להכניס כתובת אימייל חוקית",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      } else if (!validatePassword(user.password)) {
        Alert.alert(
          "שגיאה בסיסמה",
          "הסיסמה צריכה להיות באורך 6, להכיל מספרים ואותיות",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      } else if (!validatePhoneNumber(user.phoneNumber)) {
        Alert.alert(
          "שגיאה במספר הפלאפון",
          "מספר הפלאפון יכול להכיל רק מספרים וחייב להכיל 10 ספרות",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      } else if (!validateName(user.firstName)) {
        Alert.alert(
          "שגיאה בשם הפרטי",
          "שם פרטי יכול להכיל רק אותיות",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      } else if (!validateName(user.lastName)) {
        Alert.alert(
          "שגיאה בשם המשפחה",
          "שם משפחה יכול להכיל רק אותיות",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      } else if (user.password != passwordAuth) {
        Alert.alert(
          "אימות סיסמה נכשל",
          "הסיסמאות לא תואמות",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      }
      const checkEmail = await firebase.checkIfUserEmailExists(user.email);
      const checkPhone = await firebase.checkIfUserPhoneNumberExists(
        user.phoneNumber
      );
      if (checkEmail || checkPhone) {
        return;
      }
      sentOTP();
      navigation.navigate("OTPauth"); // if the user passed all the validation checks, he will continue to OTP screen the validate his phone number
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScrollView>
      <Container>
        <Main>
          <Text title semi center>
            הרשמה
          </Text>
        </Main>

        <Auth>
          <AuthContainer>
            <AuthTitle>כתובת אימייל</AuthTitle>
            <AuthField
              autoCapotalize="none"
              autoCompleteType="email"
              autoCorrect={false}
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

          <AuthContainer>
            <AuthTitle>אימות סיסמה</AuthTitle>
            <AuthField
              autoCapotalize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(passwordAuth) =>
                setPasswordAuth(passwordAuth.trim())
              }
              value={passwordAuth}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>מספר פלאפון</AuthTitle>
            <AuthField
              autoCapotalize="none"
              autoFocus={true}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber.trim())}
              value={phoneNumber}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>שם פרטי</AuthTitle>
            <AuthField
              autoCapotalize="none"
              autoFocus={true}
              onChangeText={(firstName) => setFirstName(firstName.trim())}
              value={firstName}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>שם משפחה</AuthTitle>
            <AuthField
              autoCapotalize="none"
              autoFocus={true}
              onChangeText={(lastName) => setLastName(lastName.trim())}
              value={lastName}
            />
          </AuthContainer>
        </Auth>

        <SignUpContainer onPress={signUp} disabled={loading}>
          {loading ? (
            <Loading />
          ) : (
            <Text bold center color="#ffffff">
              הרשמה
            </Text>
          )}
        </SignUpContainer>

        <SignIn onPress={() => navigation.navigate("SignIn")}>
          <Text small center>
            כבר רשום?
            <Text medium bold color="#54c9cd">
              {" "}
              התחבר{" "}
            </Text>
          </Text>
        </SignIn>

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
    </ScrollView>
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
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 300;
  text-align: left;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const SignUpContainer = styled.TouchableOpacity`
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

const SignIn = styled.TouchableOpacity`
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
  width: 100px;
  height: 600px;
  left: 30px;
  top: 140px;
`;

// const styles = StyleSheet.create({
//   iconStyle: {
//     flex: 1,
//     color: "grey",
//     resizeMode: "stretch",
//     alignItems: "center",
//   },
// });

const StatusBar = styled.StatusBar``;
