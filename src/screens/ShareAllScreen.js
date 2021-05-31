import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Button,
  StyleSheet,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Colors } from "react-native-paper";
import { TextInput, IconButton } from "react-native-paper";
import { showMessage, hideMessage } from "react-native-flash-message";
import { UserContext } from "../context/UserContext";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import Text from "../components/Text";
import styled from "styled-components";

export default ShareAllScreen = () => {
  // the user can share all of his invoices
  const [phoneNumberToShare, setPhoneNumberToShare] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [invoice, setInvoice] = useState([]);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();
  let save_uid = "";

  const getData = async () => {
    try {
      // get user id
      await db
        .collection("users")
        .where("phoneNumber", "==", phoneNumberToShare)
        .get()
        .then((doc) => {
          doc.forEach((n) => {
            save_uid = n.id;
          });
        });

      // get user email
      await db
        .collection("users")
        .doc(save_uid)
        .get()
        .then((doc) => {
          setUserData(doc.data().email);
        });

      //get all invoices of the current user
      await db
        .collection("invoices")
        .where("customer_id", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          const list = [];
          querySnapshot.forEach((docSnapshot) => {
            list.push({ ...docSnapshot.data() });
          });
          setInvoice(list);
        });
      setLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      if (loading) return <ActivityIndicator />;
      else shareInvoices();
    }
  };
  const shareInvoices = () => {
    if (!loading) {
      const approved_status_new = 1; // all the invoices need to be approved by the shared user
      const temp_invoice = [];
      invoice.map((doc) => {
        temp_invoice.push(doc);
      });
      temp_invoice.map((n) => {
        (n.approved_status = approved_status_new),
          (n.customer_id = save_uid),
          (n.customer_phone_number = phoneNumberToShare),
          (n.customer_email = userData);
      });
      temp_invoice.map(async (n) => {
        db.collection("invoices").add({ ...n });
      });
      showMessage({
        message: "החשבוניות שותפו בהצלחה",
        type: "success",
        icon: "success",
      });
      setModalVisible(!modalVisible);
    } else return <ActivityIndicator />;
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 0 }}>
        <TextInput
          theme={{ colors: { primary: "black", background: "white" } }}
          keyboardType="numeric"
          label="למי לשתף? הכנס מספר נייד"
          value={phoneNumberToShare}
          onChangeText={(phoneNumberToShare) =>
            setPhoneNumberToShare(phoneNumberToShare)
          }
        />
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <View style={styles.buttonStyleApprove}>
          <Button
            onPress={() => setModalVisible(true)}
            color={Colors.blue300}
            title="שיתוף"
          />
        </View>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <Text center medium2 heavy style={{ marginBottom: 30 }}>
                לשתף את כל החשבוניות שיש בחשבונך?
              </Text>
              <Text center color="red" heavy style={{ marginBottom: 50 }}>
                ברגע אישור פעולה זו אין אפשרות לבטל
              </Text>
              <View style={{ flexDirection: "row", marginBottom: 20 }}>
                <View style={styles.buttonStyleApprove1}>
                  <Button
                    onPress={() => getData()}
                    color={Colors.green400}
                    title="אישור"
                  />
                </View>
                <View style={styles.buttonStyleCancel1}>
                  <Button
                    onPress={() => setModalVisible(!modalVisible)}
                    color={Colors.blue300}
                    title="ביטול"
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#ffffff",
    height: 50,
    marginTop: 30,
    marginBottom: 320,
  },

  buttonStyleApprove: {
    position: "absolute",
    left: 150,
    width: 80,
  },
  centeredView1: {
    flex: 1,
    justifyContent: "center",
  },
  modalView1: {
    padding: 30,
    margin: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },

  button: {
    borderRadius: 10,
    padding: 10,
    width: 70,
    textAlign: "center",
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  buttonStyleApprove1: {
    position: "absolute",
    left: 0,
    width: 70,
  },
  buttonStyleCancel1: {
    position: "absolute",
    width: 70,
    right: 0,
  },
});
const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;
