import React, { useState, useContext } from "react";
import styled from "styled-components";
import Text from "../../components/Text";
import { FirebaseContext } from "../../context/FirebaseContext";
import { UserContext } from "../../context/UserContext";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";

export default updatePersonalInfo = ({ navigation }) => {
  // update private Name and last Name
  const [privateName, setPrivateName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const firebase1 = useContext(FirebaseContext);

  const updateInfo = async () => {
    setLoading(true);
    if (privateName === "" || lastName === "") {
      // first check if the first name or last name is not empty
      alert("יש למלא שם פרטי ושם משפחה");
      setLoading(false);
      return;
    } else {
      try {
        const db = firebase.firestore();
        db.collection("users").doc(user.uid).update({
          // fetch the user and change thier name
          firstName: privateName,
          lastName: lastName,
        });

        const uid = firebase1.getCurrentUser().uid; // change in user context the new name for immediate result.
        setUser({
          firstName: privateName,
          email: lastName,
          uid,
          isLoggedIn: true,
        });
      } catch (error) {
        alert(error.message);
      } finally {
        showMessage({
          message: "הפרטים שונו בהצלחה",
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
          <AuthTitle>שם פרטי</AuthTitle>
          <AuthField
            autoCapotalize="none"
            autoCompleteType="name"
            autoCorrect={true}
            secureTextEntry={false}
            onChangeText={(privateName) => setPrivateName(privateName)}
            value={privateName}
          />
        </AuthContainer>

        <AuthContainer>
          <AuthTitle>שם משפחה</AuthTitle>
          <AuthField
            autoCapotalize="none"
            autoCompleteType="name"
            autoCorrect={true}
            secureTextEntry={false}
            onChangeText={(lastName) => setLastName(lastName)}
            value={lastName}
          />
        </AuthContainer>
      </Auth>

      <SignInContainer onPress={updateInfo} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
          <Text bold center color="#ffffff">
            שינוי פרטים{" "}
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
