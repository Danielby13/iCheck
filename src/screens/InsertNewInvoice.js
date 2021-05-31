import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import Text from "../components/Text";
import { ScrollView, SafeAreaView } from "react-native";
import { FirebaseContext, FirebaseProvider } from "../context/FirebaseContext";
import DatePicker from "react-native-datepicker";
import { UserContext } from "../context/UserContext";
import { Image, Alert, StyleSheet, View } from "react-native";
import { Icon } from "react-native-elements";
import { InvoiceContext } from "../context/InvoiceContext";
import { showMessage, hideMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

export default InsertNewInvoice = () => {
  // the user can manually insert invoice
  const [storename, setStoreName] = useState();
  const [totalamount, setTotalAmount] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [tempinvoice, setTempInvoice] = useContext(InvoiceContext);
  const [tempUser, setTempUser] = useContext(UserContext);
  const [active, setActive] = useState();
  const [date, setDate] = useState("");
  const [modalVisibleInertsInvoice, setModalVisibleInertsInvoice] =
    useState(false);
  const navigation = useNavigation();

  const validateStoreName = (storename) => {
    var re = /^[a-zA-Z0-9]|[a-zA-Z0-9\s]|[[א-ת0-9]]|[א-ת0-9\s]$/;
    return re.test(storename);
  };
  const validateTotalAmount = (totalamount) => {
    var re = /^[0-9]+\.?[0-9][0-9]?$/;
    return re.test(totalamount);
  };

  const invoiceFuncion = (tempInvoice, tempUser) => {
    setTempInvoice(tempInvoice);
    firebase.createNewInvoice(tempInvoice, tempUser);
  };

  const insertINvoice = async () => {
    // insert new invoice
    setLoading(true);
    const invoice = {
      storename,
      totalamount,
      date,
    };

    try {
      setTempInvoice(invoice);
      // validation for the input fields
      if (
        invoice.storename == undefined ||
        invoice.totalamount == undefined ||
        invoice.date == undefined
      ) {
        Alert.alert("שגיאה", "יש למלא את כל השדות", [{ text: "אישור" }], {
          cancelable: false,
        });
        return;
      } else if (!validateStoreName(invoice.storename)) {
        Alert.alert(
          "שגיאה בשם החנות",
          "יש להכניס שם חנות חוקית",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      } else if (!validateTotalAmount(invoice.totalamount)) {
        Alert.alert(
          "שגיאה בסכום הרכישה",
          "יש להכניס סכום חוקי",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      }
      invoiceFuncion(invoice, tempUser);
      setModalVisibleInertsInvoice(!modalVisibleInertsInvoice);
      showMessage({
        message: "הוספת חשבונית בוצעה בהצלחה",
        type: "success",
        icon: "success",
      });
      navigation.navigate("היסטוריית חשבוניות");
    } catch (error) {
      console.log(error.message);
      return;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    var dat = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setDate(dat + "-" + month + "-" + year);
  }, []);
  return (
    <ScrollView>
      <Container>
        <Main>
          <Text title semi center margin="-150px 0 0 0px">
            הוספת חשבונית כללית
          </Text>
        </Main>

        <Auth>
          <AuthContainer>
            <AuthTitle>שם החנות:</AuthTitle>
            <AuthField
              autoCapotalize="none"
              autoFocus={true}
              onChangeText={(storename) => setStoreName(storename.trim())}
              value={storename}
            />
          </AuthContainer>

          <AuthContainer>
            <AuthTitle>סכום רכישה:</AuthTitle>
            <AuthField
              autoCapotalize="none"
              autoFocus={true}
              onChangeText={(totalamount) => setTotalAmount(totalamount.trim())}
              value={totalamount}
            />
          </AuthContainer>
          <AuthTitle>תאריך הקנייה:</AuthTitle>
          <DatePicker
            style={styles.datePickerStyle}
            date={date} // Initial date from state
            mode="date" // The enum of date, datetime and time
            placeholder="select date"
            format="DD-MM-YYYY"
            minDate="01-01-2018"
            maxDate="01-01-2030"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                marginLeft: 36,
              },
            }}
            onDateChange={(date) => {
              setDate(date);
            }}
          />
        </Auth>
        <InsertinvoiceContainer
          onPress={() => insertINvoice()}
          disabled={loading}
        >
          {loading ? (
            <Loading />
          ) : (
            <Text bold center color="#ffffff">
              הכנס חשבונית
            </Text>
          )}
        </InsertinvoiceContainer>

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
  margin: -50px 32px 32px;
`;

const AuthContainer = styled.View`
  margin-bottom: 20px;
`;

const AuthTitle = styled(Text)`
  color: #8e93a1;
  font-size: 16px;
  text-transform: uppercase;
  font-weight: 300;
  text-align: left;
`;

const AuthField = styled.TextInput`
  border-bottom-color: #8e93a1;
  border-bottom-width: 0.5px;
  height: 48px;
`;

const InsertinvoiceContainer = styled.TouchableOpacity`
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

const StatusBar = styled.StatusBar``;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});
