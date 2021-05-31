import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { UserContext } from "../context/UserContext";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

export default QRscannerScreen = () => {
  // the user can scan QR code to insert the invoice to his account (instead of give his phone number )
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync(); // get permission to camera
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    // get user data
    setScanned(true);
    let user_email = "";
    let user_phone = "";
    const db = firebase.firestore();
    await db
      .collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        user_email = doc.data().email;
        user_phone = doc.data().phoneNumber;
      });

    data = data
      .replace("empty5", user.uid)
      .replace("empty2", user_email)
      .replace("empty4", user_phone);

    const ob = JSON.parse(data);
    ob.map((item) => (item.transaction_date = new Date()));
    await db.collection("invoices").add(...ob); // add the new invoice to db
  };

  if (hasPermission === null) {
    return <Text>יש לתת הרשאות מצלמה עבור סריקת הQR</Text>;
  }
  if (hasPermission === false) {
    return <Text>אין גישה למצלמה</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button
          title={"החשבונית נסרקה בהצלחה, לחצו כאן על מנת לסרוק שוב"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
