import React, { useContext, useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Colors } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";
import styled from "styled-components";
import Text from "../components/Text";

export default DeleteUserScreen = () => {
  // delete user will completely delete all the invoice/data from db
  const [user, setUser] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const db = firebase.firestore();
  const firebase1 = useContext(FirebaseContext);

  const logOut = async () => {
    // after we delete all of the data linked to the user we logOut the user
    const loggedOut = await firebase1.logOut();
    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };

  const deleteUserDataInvoice = async () => {
    // delete all invoices that linked to the user
    setLoading(true);

    try {
      await db
        .collection("invoices")
        .where("customer_id", "==", user.uid)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((docSnapshot) => {
            try {
              db.collection("invoices").doc(docSnapshot.id).delete();
            } catch (error) {
              alert(error.message);
            }
          });
        });
    } catch (error) {
    } finally {
      setLoading(false);
      deleteUserData();
    }
  };

  const deleteUserData = async () => {
    // delete user data completely
    setLoading(true);
    try {
      await db.collection("users").doc(user.uid).delete();
    } catch (error) {
    } finally {
      setModalVisible(false);
      showMessage({
        message: "החשבון נמחק בהצלחה",
        type: "success",
        icon: "success",
      });
      setLoading(false);
      logOut();
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}>
      <ScrollView>
        <Text medium2 left heavy style={{ marginTop: 20, marginBottom: 20 }}>
          האם ברצונך למחוק חשבון זה?
        </Text>

        <Text medium left style={{ marginBottom: 80 }}>
          <Icon name="close" type="ionicon" size={15} />
          פעולה זו תמחק את חשבון המשתמש ואת כל החשבוניות הקיימות אצלנו במערכת.
          {"\n\n"}
          <Icon name="close" type="ionicon" size={15} />
          מרגע אישור הפעולה לא יהיה ניתן לשחזר את הנתונים.
        </Text>

        <View style={styles.buttonStyleCancel}>
          <Button
            onPress={() => setModalVisible(true)}
            title={loading ? <Loading /> : "מחיקת חשבון"}
            buttonStyle={{ backgroundColor: Colors.red400 }}
            disabled={loading}
          />
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
                  לאפס חשבון זה?{" "}
                </Text>
                <Text center color="red" heavy style={{ marginBottom: 50 }}>
                  ברגע אישור פעולה זו אין אפשרות לשחזר את הנתונים במשתמש זה
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <View style={styles.buttonStyleApproveModal}>
                    <Button
                      onPress={() => deleteUserDataInvoice()}
                      buttonStyle={{ backgroundColor: Colors.red400 }}
                      title={loading ? <Loading /> : "מחיקת חשבון"}
                    />
                  </View>
                  <View style={styles.buttonStyleCancelModal}>
                    <Button
                      onPress={() => setModalVisible(!modalVisible)}
                      buttonStyle={{ backgroundColor: Colors.blue400 }}
                      title="ביטול"
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    flex: 1,
    resizeMode: "stretch",
    alignItems: "center",
  },
  listView: {
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyleApprove: {
    display: "flex",
    flex: 1,
    width: 180,
    position: "absolute",
    left: 8,
  },

  buttonStyleCancel: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
  },

  centeredView1: {
    flex: 1,
    justifyContent: "center",
  },
  modalView1: {
    padding: 30,
    margin: 10,
    backgroundColor: "#e7e7e7",
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
  buttonStyleApproveModal: {
    position: "absolute",
    left: 0,
  },
  buttonStyleCancelModal: {
    position: "absolute",
    width: 70,
    right: 0,
  },
});

const Loading = styled.ActivityIndicator.attrs((props) => ({
  color: "#ffffff",
  size: "small",
}))``;
