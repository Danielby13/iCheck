import React, { useState, useContext } from "react";
import styled from "styled-components";
import Text from "../../components/Text";
import { FirebaseContext } from "../../context/FirebaseContext";
import { UserContext } from "../../context/UserContext";
import { Image, Linking, Button } from "react-native";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";

export default updatePasswordScreen = ({ navigation }) => {
  // update Password Screen, give the user opportunity to change their password
  const [passwordOld, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();
  const [passwordNewConf, setPasswordNewConf] = useState();
  const [loading, setLoading] = useState(false);
  const firebase1 = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const updatePassword = async () => {
    // changing the password in db
    setLoading(true);
    if (passwordNew != passwordNewConf) {
      // before change the password, we check if the password is matching with the confirm field
      alert("Incompatible passwords");
      setLoading(false);
      return;
    } else {
      try {
        const user = firebase.auth().currentUser; //fetch the current user
        await firebase1.signIn(user.email, passwordOld);
        user.updatePassword(passwordNew);
      } catch (error) {
        alert(error.message);
      } finally {
        showMessage({
          message: "הסיסמה שונתה בהצלחה",
          type: "success",
          icon: "success",
        });
        setLoading(false);
      }
    }
  };
  return (
    <Container>
      <Auth>
        <AuthContainer>
          <AuthTitle>סיסמה נוכחית</AuthTitle>
          <AuthField
            autoCapotalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(passwordOld) => setPasswordOld(passwordOld.trim())}
            value={passwordOld}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>סיסמה חדשה</AuthTitle>
          <AuthField
            autoCapotalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(passwordNew) => setPasswordNew(passwordNew.trim())}
            value={passwordNew}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>אימות סיסמה</AuthTitle>
          <AuthField
            autoCapotalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(passwordNewConf) =>
              setPasswordNewConf(passwordNewConf.trim())
            }
            value={passwordNewConf}
          />
        </AuthContainer>
      </Auth>

      <SignInContainer onPress={updatePassword} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            שינוי סיסמה
          </Text>
        )}
      </SignInContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
  background-color: white;
`;

const Auth = styled.View`
  margin: 25px 32px 32px;
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
