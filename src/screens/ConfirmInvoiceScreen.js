import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Modal,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { Colors } from "react-native-paper";
import { Button } from "react-native-elements";
import { UserContext } from "../context/UserContext";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import { showMessage, hideMessage } from "react-native-flash-message";

import styled from "styled-components";
import Text from "../components/Text";

export default ConfirmInvoiceScreen = ({ navigation }) => {
  // confirm invoice screen, after sharing invoices the shared user will need to confirm the invoices
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [invoiceKey, setinvoiceKey] = useState("");
  const [modalVisibleDeleteInvoice, setModalVisibleDeleteInvoice] =
    useState(false);
  const [user, setUser] = useContext(UserContext);
  // const navigation = useNavigation();

  useEffect(() => {
    // fetch the relevant data to the specific user and insert it into list
    const db = firebase
      .firestore()
      .collection("invoices")
      .where("customer_id", "==", user.uid)
      .where("approved_status", "==", 1)
      .orderBy("transaction_date", "desc")
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((docSnapshot) => {
          list.push({ ...docSnapshot.data(), key: docSnapshot.id });
        });
        setInvoice(list);
        setLoading(false);
      });
    return () => db();
  }, []);

  const approveInvoice = async (invoice_id) => {
    // approve the invoice
    setloadingUpdate(true);
    try {
      const db = firebase.firestore();
      db.collection("invoices")
        .doc(invoice_id)
        .update({
          approved_status: parseInt(0),
        }); // change status to 0 in db
    } catch (error) {
      alert(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };

  const deleteInvoiceModal = (invoice_key) => {
    //open the modal screen
    setModalVisibleDeleteInvoice(true);
    setinvoiceKey(invoice_key);
  };

  const deleteInvoice = async () => {
    //delete the invoice
    setloadingUpdate(true);

    try {
      const db = firebase.firestore();
      db.collection("invoices").doc(invoiceKey).delete();
    } catch (error) {
      alert(error.message);
    } finally {
      // close the modal screen
      setloadingUpdate(false);
      setModalVisibleDeleteInvoice(!modalVisibleDeleteInvoice);
    }
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  const emptyData = () => {
    if (invoice.length == 0) {
      return (
        <Text center heavy>
          אין חשבוניות שממתינות לאישור{" "}
        </Text>
      );
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}>
      <ScrollView>
        {emptyData()}
        <FlatList
          data={invoice}
          renderItem={({ item }) => (
            <View styles={{ display: "flex", flexDirection: "row" }}>
              <ListItem key={item.id} bottomDivider button>
                <Icon name="description" />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text heavy medium2>
                      <Text>
                        {new Date(item.transaction_date.toDate())
                          .toISOString()
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("/")}
                      </Text>{" "}
                      {item.store_name}
                    </Text>
                  </ListItem.Title>
                </ListItem.Content>
                <Text heavy medium2>
                  {item.total_amount} ₪
                </Text>
              </ListItem>

              <View style={{ flexDirection: "row", marginBottom: 50 }}>
                <View style={styles.buttonStyleApprove}>
                  <Button
                    icon={<Icon name="done-all" size={20} color="white" />}
                    onPress={() => approveInvoice(item.key)}
                    title="אישור חשבונית"
                    buttonStyle={{ backgroundColor: Colors.green400 }}
                  />
                </View>
                <View style={styles.buttonStyleCancel}>
                  <Button
                    icon={
                      <Icon name="delete-forever" size={20} color="white" />
                    }
                    onPress={() => deleteInvoiceModal(item.key)}
                    title="מחיקת חשבונית"
                    buttonStyle={{ backgroundColor: Colors.red400 }}
                  />
                </View>
              </View>
            </View>
          )}
        />

        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisibleDeleteInvoice}
            onRequestClose={() => {
              setModalVisibleDeleteInvoice(!modalVisibleDeleteInvoice);
            }}
          >
            <View style={styles.centeredView1}>
              <View style={styles.modalView1}>
                <Text center medium2 heavy style={{ marginBottom: 30 }}>
                  למחוק חשבונית זו?
                </Text>
                <Text center color="red" heavy style={{ marginBottom: 50 }}>
                  ברגע אישור פעולה זו אין אפשרות לשחזור החשבונית
                </Text>
                <View style={{ flexDirection: "row", marginBottom: 20 }}>
                  <View style={styles.buttonStyleApproveModal}>
                    <Button
                      onPress={() => deleteInvoice()}
                      buttonStyle={{ backgroundColor: Colors.red400 }}
                      title="מחיקת חשבונית"
                    />
                  </View>
                  <View style={styles.buttonStyleCancelModal}>
                    <Button
                      onPress={() =>
                        setModalVisibleDeleteInvoice(!modalVisibleDeleteInvoice)
                      }
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
    display: "flex",
    width: 180,
    position: "absolute",
    right: 8,
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
