import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import ModalDropdown from "react-native-modal-dropdown";
import { IconButton, Colors, DataTable } from "react-native-paper";
import { Button } from "react-native-elements";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { showMessage, hideMessage } from "react-native-flash-message";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import styled from "styled-components";
import Text from "../components/Text";

export default DetailedInvoiceScreen = ({ route }) => {
  // Detailed Invoice Screen, here the user can see the full invoice data and change its category, export to pdf,
  // delete the invoice, share the specific invocie with another user, insert the invoice to warranty
  const [loading, setLoading] = useState(true);
  const [loadingPDF, setLoadingPDF] = useState(true);
  const [loadingUpdate, setloadingUpdate] = useState(false);
  const [invoice, setInvoice] = useState([]);
  const [items_details, setItems_details] = useState([]);
  const [htmlContent, setHtmlContent] = useState();
  const invoice_id = route.params.item_uid;
  const [optionState, setOptionState] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleDeleteInvoice, setModalVisibleDeleteInvoice] =
    useState(false);
  const [modalVisibleShareInvoice, setModalVisibleShareInvoice] =
    useState(false);
  const [insertWarranty, setInsertWarranty] = useState();
  const [phoneNumberToShare, setPhoneNumberToShare] = useState();
  let sum_total_price = 0;
  const navigation = useNavigation();
  const DEMO_OPTIONS_1 = [
    "בילוי ומסעדות",
    "חינוך ומשפחה",
    "תרבות ופנאי",
    "מזון ומשקאות",
    "ביגוד והנעלה",
    "יופי ואביזרי אופנה",
    "בריאות",
    "מוצרי חשמל ותקשורת",
    "בית וגן",
    "רכב ותחבורה",
    "מתנות ומזכרות",
    "שונות",
  ];

  const createAndSavePDF = async (html) => {
    // create PDF and download it to the phone
    try {
      const { uri } = await Print.printToFileAsync({ html }); // get permission from user
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // create PDF template, via HTML format
    const db = firebase
      .firestore()
      .collection("invoices")
      .doc(invoice_id)
      .get()
      .then((docRef) => {
        const items = [];
        const list = [];
        list.push({ ...docRef.data(), key: docRef.id });
        setInvoice(list);
        items.push({ ...docRef.data().details, key: docRef.id });
        setItems_details(items);
        setOptionState(list.map((item) => item.category));
        const htmlContent = `

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Pdf Content</title>
            <style>
            table.blueTable {
              border: 0px solid #1C6EA4;
              background-color: #FFFFFF;
              width: 100%;
              text-align: center;
              border-collapse: collapse;
            }
            table.blueTable td, table.blueTable th {
              border: 0px solid #AAAAAA;
              padding: 3px 2px;
            }
            table.blueTable tbody td {
              font-size: 13px;
            }
            table.blueTable tr:nth-child(even) {
              background: #FFFFFF;
            }
            table.blueTable td:nth-child(even) {
              background: #FFFFFF;
            }
            table.blueTable thead {
              background: #FFFFFF;
              background: -moz-linear-gradient(top, #ffffff 0%, #ffffff 66%, #FFFFFF 100%);
              background: -webkit-linear-gradient(top, #ffffff 0%, #ffffff 66%, #FFFFFF 100%);
              background: linear-gradient(to bottom, #ffffff 0%, #ffffff 66%, #FFFFFF 100%);
              border-bottom: 2px solid #A9A9A9;
            }
            table.blueTable thead th {
              font-size: 15px;
              font-weight: bold;
              color: #A9A9A9;
              text-align: center;
            }
            table.blueTable tfoot td {
              font-size: 14px;
            }
            table.blueTable tfoot .links {
              text-align: right;
            }
            table.blueTable tfoot .links a{
              display: inline-block;
              background: #1C6EA4;
              color: #FFFFFF;
              padding: 2px 8px;
              border-radius: 5px;
            }
            </style>
        </head>
        <body>
        <h2 style="text-align: center;"><strong>${list.map(
          (item) => item.store_name
        )}</strong></h2>
      <p style="text-align: center;"> 
      תאריך קנייה:
  
      ${list.map((item) =>
        new Date(item.transaction_date.toDate())
          .toISOString()
          .split("T")[0]
          .split("-")
          .reverse()
          .join("/")
      )} 
      ${list.map((item) =>
        new Date(item.transaction_date.toDate()).toLocaleTimeString("heb-il")
      )}  
      </p>
      <p style="text-align: center;"><strong>מספר חשבונית: ${list.map(
        (item) => item.invoice_number
      )} </strong></p>
      <p style="text-align: center;">ח.פ: ${list.map(
        (item) => item.store_id
      )}</p>
      <p dir="rtl" style="text-align: center;">כתובת העסק: ${list.map(
        (item) => item.store_address
      )}, ${list.map((item) => item.store_city)}</p>
      <p style="text-align: center;">טלפון בית העסק: ${list.map(
        (item) => item.store_phone
      )}</p>
      <table dir="rtl" class="blueTable">
      <thead>
      <tr>
      <th>מק"ט/קוד פריט</th>
      <th>תיאור מק"ט</th>
      <th>כמות</th>
      <th>מחיר</th>
      </tr>
      </thead>
      <tbody>
      
      ${list.map((item) =>
        Object.keys(item.details).map(
          (index) => `
          <tr>
            <td>
              ${item.details[index].item_code}
            </td>
            <td>
            ${item.details[index].item_description}
            </td>
            <td>
            ${item.details[index].item_amount}
            </td>
            <td>
            ${item.details[index].item_price}
            </td>
            `
        )
      )}
      </tbody>
      </tr>
      </table>
        <h3 dir="rtl" style="text-align: left;"><strong>סה"כ לתשלום: ${list.map(
          (item) => item.total_amount
        )} ₪</strong></h3>
        <p dir="rtl" style="text-align: right;">סוג תשלום: ${list.map(
          (item) => item.payment_type
        )}</p>
        ${list.map((item) =>
          item.payment_type == "credit"
            ? `
        <p dir="rtl" style="text-align: right;">מספר תשלומים: ${list.map(
          (item) => item.payments
        )} </p>
        <p dir="rtl" style="text-align: right;">4 ספרות אחרונות של כרטיס האשראי: ${list.map(
          (item) => item.credit_number
        )} </p>
        `
            : ``
        )}
      <p dir="rtl"style="text-align: right;">מע"מ: ${list.map(
        (item) => item.vat
      )}</p>
      <p dir="rtl" style="text-align: right;">סכום שהתקבל באמצעות אמצעי התשלום: ${list.map(
        (item) => item.total_amount
      )} ₪</p>
      <p dir="rtl" style="text-align: right;">שם הקופאי: ${list.map(
        (item) => item.seller_name
      )} </p>
        </body>
        </html>
      `;
        setHtmlContent(htmlContent);
      })
      .catch((error) => {});
    setLoadingPDF(false);
    setLoading(false);
  }, []);

  if (loading && loadingPDF) {
    return <ActivityIndicator />;
  }

  const updateCategory = async (newCategory) => {
    // update category
    setloadingUpdate(true);

    try {
      // change ctegory in db
      const db = firebase.firestore();
      db.collection("invoices").doc(invoice_id).update({
        category: newCategory,
      });
    } catch (error) {
      alert(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };

  const updateWarranty = async () => {
    // update warranty
    setloadingUpdate(true);

    try {
      const db = firebase.firestore();
      db.collection("invoices")
        .doc(invoice_id)
        .update({
          warranty: parseInt(insertWarranty),
        });
    } catch (error) {
      alert(error.message);
    } finally {
      setloadingUpdate(false);
      setModalVisible(!modalVisible);
      showMessage({
        message: "האחריות נשמרה בהצלחה",
        type: "success",
        icon: "success",
      });
    }
  };

  const deleteInvoice = async () => {
    // delete invoice from db
    setloadingUpdate(true);

    try {
      const db = firebase.firestore();
      db.collection("invoices").doc(invoice_id).delete();
    } catch (error) {
      alert(error.message);
    } finally {
      setloadingUpdate(false);
      setModalVisibleDeleteInvoice(!modalVisibleDeleteInvoice);
      showMessage({
        message: "החשבונית נמחקה",
        type: "danger",
        icon: "danger",
      });
      navigation.navigate("היסטוריית חשבוניות");
    }
  };

  const shareInvoice = async () => {
    // share invoice with another user
    setloadingUpdate(true);

    try {
      let save_uid = "";
      let new_user_email = "";
      const db = firebase.firestore();

      await db
        .collection("users")
        .where("phoneNumber", "==", phoneNumberToShare)
        .get()
        .then((doc) => {
          doc.forEach((n) => {
            save_uid = n.id;
          });
        });
      if (!save_uid) {
        // if there is no valid uid
        Alert.alert(
          "שגיאה",
          "לא נמצא משתמש עם המספר שהוכנס",
          [{ text: "אישור" }],
          { cancelable: false }
        );
        return;
      }

      await db
        .collection("users")
        .doc(save_uid)
        .get()
        .then((doc) => {
          new_user_email = doc.data().email;
        });

      let invo_number = 1;
      const approved_status_new = 1;
      const temp_invoice = [];
      invoice.map((doc) => {
        temp_invoice.push(doc);
      });
      temp_invoice.map((n) => {
        (n.approved_status = approved_status_new),
          (n.customer_id = save_uid),
          (n.customer_phone_number = phoneNumberToShare),
          (n.customer_email = new_user_email),
          (invo_number = n.invoice_number);
      });

      // if invoice is alreay exists we dont add the invoice again
      const check_if_invoice_ex = await db
        .collection("invoices")
        .where("invoice_number", "==", invo_number)
        .where("customer_phone_number", "==", phoneNumberToShare)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            Alert.alert(
              "שגיאה",
              "חשבונית זו שותפה עם מספר הפלאפון שהוזן",
              [{ text: "אישור" }],
              { cancelable: false }
            );
            return false;
          }
          return true;
        });

      if (check_if_invoice_ex) {
        // check if the variable is empty
        await db.collection("invoices").add(...temp_invoice);
        showMessage({
          message: "החשבונית שותפה בהצלחה",
          type: "success",
          icon: "success",
        });
        setModalVisibleShareInvoice(!modalVisibleShareInvoice);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setloadingUpdate(false);
    }
  };

  return (
    <ScrollView>
      <FlatList
        data={invoice}
        renderItem={({ item }) => (
          <Container>
            <IconButton
              icon="pdf-box"
              color={Colors.blue300}
              size={50}
              onPress={() => createAndSavePDF(htmlContent)}
              style={{
                top: 23,
                left: 355,
                margin: -40,
              }}
            />

            <StoreDetail>
              <TitleStore>
                <Text large center heavy>
                  {item.store_name}
                </Text>
              </TitleStore>
              <Text center>
                תאריך קנייה:
                {new Date(item.transaction_date.toDate())
                  .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}{" "}
                {new Date(item.transaction_date.toDate()).toLocaleTimeString(
                  "heb-il"
                ) == "00:00:00"
                  ? ""
                  : new Date(item.transaction_date.toDate()).toLocaleTimeString(
                      "heb-il"
                    )}{" "}
              </Text>

              <Text center heavy>
                {item.invoice_number == "0000"
                  ? "חשבונית זו הוכנסה ידנית"
                  : "מספר חשבונית:" + item.invoice_number}
              </Text>

              <Text center>
                {item.store_id == "0000" ? "" : "ח.פ: " + item.store_id + "\n"}
                {item.store_address == "null"
                  ? " "
                  : " כתובת העסק: " +
                    item.store_address +
                    ", " +
                    item.store_city +
                    "\n"}
                {item.store_phone == "0"
                  ? ""
                  : "טלפון בית העסק: " + item.store_phone}
              </Text>
            </StoreDetail>
            <InvoiceTable>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title>מק"ט/קוד פריט</DataTable.Title>
                  <DataTable.Title numeric>תיאור מק"ט</DataTable.Title>
                  <DataTable.Title numeric>כמות</DataTable.Title>
                  <DataTable.Title numeric>מחיר</DataTable.Title>
                </DataTable.Header>

                {invoice.map((item) =>
                  Object.keys(item.details).map((index) => (
                    <DataTable.Row>
                      <DataTable.Cell>
                        {item.details[index].item_code}
                      </DataTable.Cell>
                      <DataTable.Cell numeric style={{ flex: 1.1 }}>
                        {item.details[index].item_description}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {item.details[index].item_amount}
                      </DataTable.Cell>
                      <DataTable.Cell numeric>
                        {item.details[index].item_price}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))
                )}
              </DataTable>
            </InvoiceTable>
            {/* סה"כ כמות פריטים: {invoice.total_amount} {" "} */}
            <Total_cost>
              <Text medium heavy>
                סה"כ לתשלום: {item.total_amount} ₪
              </Text>
            </Total_cost>
            <Summary>
              {item.payment_type == "null"
                ? ""
                : "סוג תשלום: " + item.payment_type + "\n"}
              {item.payment_type == "credit" ? (
                <Text left>
                  מספר תשלומים: {item.payments} {"\n"}4 ספרות אחרונות של כרטיס
                  האשראי: {item.credit_number} {"\n"}
                  מע"מ: {item.vat} {"\n"}
                  סכום שהתקבל באמצעות אמצעי התשלום: {item.total_amount} ₪
                </Text>
              ) : (
                <Text left>
                  {item.vat == 0 ? "" : 'מע"מ: ' + item.vat + "\n"}
                  סכום שהתקבל באמצעות אמצעי התשלום: {item.total_amount} ₪
                </Text>
              )}
              {"\n"}
              {item.seller_name == "null"
                ? ""
                : "שם קופאי/ת: " + item.seller_name}
              {/* שם קופאי\ת: {item.seller_name} */}
            </Summary>
          </Container>
        )}
      />

      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            titleStyle={{
              fontSize: 14,
            }}
            buttonStyle={{ backgroundColor: Colors.blue300 }}
            title="שיתוף חשבונית עם משתמש אחר"
            onPress={() => setModalVisibleShareInvoice(true)}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.dropdown_1}>
            <Text style={styles.dropdown_1_text}> שינוי קטגוריה</Text>
            <ModalDropdown
              dropdownStyle={styles.dropdown_1_dropdown}
              style={styles.dropdown_1}
              defaultValue={optionState}
              textStyle={styles.dropdown_1_text}
              options={DEMO_OPTIONS_1}
              onSelect={(idx, value) => updateCategory(value)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            titleStyle={{
              fontSize: 14,
            }}
            buttonStyle={{ backgroundColor: Colors.blue300 }}
            title="שמירת חשבונית למוצרים באחריות"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <View style={styles.deleteButtonContainer}>
        <Button
          titleStyle={{
            fontSize: 14,
          }}
          buttonStyle={{ backgroundColor: Colors.red300, height: 35 }}
          title="מחיקת חשבונית"
          onPress={() => setModalVisibleDeleteInvoice(true)}
        />
      </View>

      {/* Share Invoice Modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisibleShareInvoice}
          onRequestClose={() => {
            setModalVisibleShareInvoice(!modalVisibleShareInvoice);
          }}
        >
          <View style={styles.centeredView1}>
            <View style={styles.modalView1}>
              <IconButton
                icon="close-outline"
                color={Colors.red400}
                size={30}
                onPress={() =>
                  setModalVisibleShareInvoice(!modalVisibleShareInvoice)
                }
                style={{
                  top: 0,
                  left: 335,
                  margin: -30,
                }}
              />

              <TextInput
                theme={{ colors: { primary: "gray" } }}
                keyboardType="numeric"
                label="למי לשתף? הכנס מספר נייד"
                value={phoneNumberToShare}
                onChangeText={(phoneNumberToShare) =>
                  setPhoneNumberToShare(phoneNumberToShare)
                }
              />

              <Button
                onPress={() => shareInvoice()}
                color={Colors.blue300}
                title="שיתוף חשבונית"
              />
            </View>
          </View>
        </Modal>
      </View>

      {/* Warranty Modal */}
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
              <IconButton
                icon="close-outline"
                color={Colors.red400}
                size={30}
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  top: 0,
                  left: 335,
                  margin: -30,
                }}
              />

              <TextInput
                theme={{ colors: { primary: "gray" } }}
                keyboardType="numeric"
                label="הכניסו מס' חודשי אחריות שנותרו למוצר"
                value={insertWarranty}
                onChangeText={(insertWarranty) =>
                  setInsertWarranty(insertWarranty)
                }
              />

              <Button
                onPress={() => updateWarranty()}
                color={Colors.blue300}
                title="שמור"
              />
            </View>
          </View>
        </Modal>
      </View>

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
                <View style={styles.buttonStyleApprove}>
                  <Button
                    onPress={() => deleteInvoice()}
                    title="מחיקת חשבונית"
                  />
                </View>
                <View style={styles.buttonStyleCancel}>
                  <Button
                    onPress={() =>
                      setModalVisibleDeleteInvoice(!modalVisibleDeleteInvoice)
                    }
                    color={Colors.blue300}
                    title="ביטול"
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

const Container = styled.View`
  margin: 10px;
  text-align: center;
  flex: 1;
  background-color: #ffffff;
`;

const StoreDetail = styled.View`
  margin: 10px;
`;

const InvoiceTable = styled.View`
  text-align: right;
`;

const Summary = styled(Text)`
  text-align: left;
  margin: 10px;
`;

const Total_cost = styled(Text)`
  text-align: right;
  font-size: 20;
  margin: 10px;
  margin-bottom: -10px;
`;
const TitleStore = styled(Text)`
  text-align: center;
  margin-bottom: 20px;
`;
const UpdateWarranty = styled.TouchableOpacity`
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.blue300,
    // elevation: 3,
  },
  buttonContainer: {
    flex: 1,
    // borderColor: "transparent",
    elevation: 0,
  },
  buttonStyleApprove: {
    position: "absolute",
    left: 0,
  },
  buttonStyleCancel: {
    position: "absolute",
    width: 70,
    right: 0,
  },
  deleteButtonContainer: {
    flex: 1,
    marginTop: 50,
    width: 120,
    left: 280,
  },
  dropdown_1: {
    flex: 1,
    width: 170,
    height: 70,
    flexGrow: 1,
    backgroundColor: Colors.blue300,
    borderRadius: 3,
    // borderWidth: 1,
    // borderColor: "gray",
  },
  dropdown_1_text: {
    marginVertical: 10,
    marginHorizontal: 50,
    color: "white",
    textAlign: "center",
    flexWrap: "wrap",
    flexGrow: 1,
    flexShrink: 1,
    flex: 1,
    textAlignVertical: "center",
  },
  dropdown_1_dropdown: {
    width: 170,
    height: 300,
    textAlign: "left",
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

  // button: {
  //   borderRadius: 10,
  //   padding: 10,
  //   width: 70,
  //   textAlign: "center",
  //   elevation: 2,
  // },
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
});
