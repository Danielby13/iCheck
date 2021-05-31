import React, { createContext, useContext } from "react";
import { Alert } from "react-native";
import { InvoiceContext } from "../context/InvoiceContext";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import config from "../config/firebase";
import moment from "moment";

const FirebaseContext = createContext(); //Context for firebase do manage user function like: create user, logout etc...

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const findPhone = [];

const Firebase = {
  getCurrentUser: () => {
    // get current user data from firestore
    return firebase.auth().currentUser;
  },
  createUser: async (user) => {
    // create user for the first time
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      const uid = Firebase.getCurrentUser().uid;

      await db.collection("users").doc(uid).set({
        email: user.email,
        phoneNumber: user.phoneNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        active: "1",
      });

      delete user.password;

      return { ...user, uid };
    } catch (error) {
      console.log("Error @createUser: ", error.message);
      alert(error.message);
      return;
    }
  },

  createNewInvoice: async (invoice, user) => {
    //create new invoice
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then(function (doc) {
        findPhone.push(doc.data().phoneNumber);
      });

    try {
      const res = await db.collection("invoices").add({
        approved_status: parseInt("0"),
        category: "שונות",
        credit_number: parseInt("0000"),
        customer_email: user.email,
        customer_id: user.uid,
        customer_phone_number: findPhone[0],
        details: {
          item1: {
            item_amount: parseFloat("1"),
            item_code: "0000",
            item_description: "הוספת חשבונית ידנית",
            item_price: parseFloat(invoice.totalamount),
          },
        },
        invoice_number: "0000",
        payment_type: "null",
        payments: parseInt("0"),
        refund: parseFloat("0"),
        seller_name: "null",
        store_address: "null",
        store_city: "null",
        store_id: "0000",
        store_name: invoice.storename,
        store_phone: parseInt("00000000"),
        total_amount: parseFloat(invoice.totalamount),
        transaction_date: firebase.firestore.Timestamp.fromDate(
          new Date(moment(invoice.date, "DD/MM/YYYY").format("LL"))
        ),
        vat: parseFloat("0"),
        warranty: parseFloat("0"),
      });
      console.log(moment(invoice.date, "DD/MM/YYYY").format("LL"));
      return { ...res, invoice };
    } catch (error) {
      console.log("Error @createUser: ", error.message);
      alert(error.message);
      return;
    }
  },

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError("Network request failed."));
      };

      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    //get user info
    try {
      const user = await db.collection("users").doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log("Error @getUserInfo: ", error);
    }
  },
  logOut: async () => {
    //log out function
    try {
      await firebase.auth().signOut();

      return true;
    } catch (error) {
      console.log("Error @logOut: ", error);
    }
    return false;
  },

  signIn: async (email, password) => {
    //signIn function
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  checkIfUserEmailExists: async (email) => {
    // check if user or email already exists in the database
    try {
      const checkEmail = await db
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            Alert.alert(
              "שגיאה",
              "האימייל שהזנתם כבר קיים במערכת",
              [{ text: "אישור" }],
              { cancelable: false }
            );
            return true;
          }
        });
      if (checkEmail == true) {
        return true;
      }
      return false;
    } catch (err) {
      console.log("can not fetch data");
    }
  },

  checkIfUserPhoneNumberExists: async (phoneNumber) => {
    // check if phone number already exists in the database
    try {
      const checkPhone = await db
        .collection("users")
        .where("phoneNumber", "==", phoneNumber)
        .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
            Alert.alert(
              "שגיאה",
              "מספר הפלאפון שהזנתם כבר קיים במערכת",
              [{ text: "אישור" }],
              { cancelable: false }
            );
            return true;
          }
        });
      if (checkPhone == true) {
        return true;
      }
      return false;
    } catch (err) {
      console.log("can not fetch data");
    }
  },

  getInvoiceData: async (uid) => {
    // get invoice data
    const [invoice, setInvoice] = useContext(InvoiceContext);
    const invoicesRef = db.collection("invoices");
    const snapshot = await invoicesRef.where("customer_id", "==", uid).get();
    if (snapshot.empty) {
      console.log("No matching documents.");
      return;
    }
    return snapshot;
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export { FirebaseContext, FirebaseProvider };
