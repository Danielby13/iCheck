import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { Searchbar } from "react-native-paper";
import { UserContext } from "../context/UserContext";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import styled from "styled-components";
import Text from "../components/Text";

export default InvoiceHistory = ({ navigation }) => {
  // list of all the invoices that linked to the current user
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [state, setState] = useState({
    data: [],
    arrayholder: [],
  });
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    // fetch all the invoices linked to the current user from db and push it into list
    const db = firebase
      .firestore()
      .collection("invoices")
      .where("customer_id", "==", user.uid)
      .where("approved_status", "==", 0)
      .orderBy("transaction_date", "desc")
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((docSnapshot) => {
          list.push({ ...docSnapshot.data(), key: docSnapshot.id });
        });
        setInvoice(list);
        setLoading(false);
        setState({ arrayholder: list });
      });
    return () => db();
  }, []);

  const searchFilterFunction = (text) => {
    // serach function, the user can search by serval field (total amount, store name, purchase date)
    const newData = invoice.filter((item) => {
      const itemData = `${item.store_name.toUpperCase()}   
      ${item.total_amount} ${new Date(item.transaction_date.toDate())
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/")} `;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setState({ data: newData });
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  const emptyData = () => {
    // check if there are no invoices to show
    if (invoice.length == 0) {
      return (
        <Text center heavy>
          אין חשבוניות להצגה{" "}
        </Text>
      );
    }
  };
  return (
    <View>
      <ScrollView>
        <Searchbar
          placeholder="חיפוש חשבונית..."
          onChangeText={(text) => searchFilterFunction(text)}
          autoCorrect={false}
          value={state.data}
        />
        {emptyData()}
        <FlatList
          data={
            state.data && state.data.length > 0 ? state.data : state.arrayholder
          }
          renderItem={({ item }) => (
            <View>
              <ListItem
                key={item.id}
                bottomDivider
                button
                onPress={() =>
                  navigation.navigate("חשבונית מפורטת", { item_uid: item.key })
                }
              >
                <Icon name="description" />
                <ListItem.Content>
                  <ListItem.Title>
                    <Text heavy medium2>
                      {" "}
                      {item.store_name}
                    </Text>
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    <Text>
                      {new Date(item.transaction_date.toDate())
                        .toISOString()
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/")}
                    </Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
                <Text heavy medium2>
                  {item.total_amount} ₪
                </Text>
                <Icon name="keyboard-arrow-left" />
              </ListItem>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    flex: 1,
    color: "grey",
    resizeMode: "stretch",
    alignItems: "center",
  },
  listView: {
    height: 100,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
