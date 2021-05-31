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
import moment from "moment";
import { extendMoment } from "moment-range";

import styled from "styled-components";
import Text from "../components/Text";

export default WarrantyInvoice = ({ navigation }) => {
  // warrany invoices screen. display all the invoice with the current warranty, the user can see when the warranty of each invoice will end
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [date, setDate] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [state, setState] = useState({
    data: [],
    arrayholder: [],
  });
  const momento = extendMoment(moment);

  useEffect(() => {
    // fetch all the warranty invoices from db
    var dat = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    setDate(dat + "/" + month + "/" + year);
    const db = firebase
      .firestore()
      .collection("invoices")
      .where("customer_id", "==", user.uid)
      .where("warranty", ">", 0)
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

  function check_warranty(item) {
    const strdate = date.split("/");
    const strtarn = item.transaction_date
      .toDate()
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("/")
      .split("/");
    const start = new Date(strdate[2], strdate[1], strdate[0]);
    const end = new Date(strtarn[2], strtarn[1], strtarn[0]);
    const rangee = momento.range(end, start);
    if (rangee.diff("months") <= item.warranty) return true;
    return false;
  }
  const searchFilterFunction = (text) => {
    // search function
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
          renderItem={({ item }) => {
            if (check_warranty(item)) {
              return (
                <View>
                  <ListItem
                    key={item.id}
                    bottomDivider
                    button
                    onPress={() =>
                      navigation.navigate("חשבונית מפורטת", {
                        item_uid: item.key,
                      })
                    }
                  >
                    <Icon name="description" />
                    <ListItem.Content>
                      <ListItem.Title>
                        <Text heavy medium2 style={{ color: "#7cc" }}>
                          {" "}
                          {item.store_name}
                        </Text>
                      </ListItem.Title>
                      <ListItem.Subtitle>
                        <Text>
                          {moment(
                            new Date(item.transaction_date.toDate())
                              .toISOString()
                              .split("T")[0]
                              .split("-")
                              .join("-")
                          )
                            .add({ days: 2 })
                            .toISOString()
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("/")}
                        </Text>
                      </ListItem.Subtitle>
                      <ListItem.Subtitle>
                        <Text heavy>
                          {" "}
                          {item.warranty}
                          {" חודשי אחריות עד לתאריך: "}
                        </Text>
                      </ListItem.Subtitle>
                      <ListItem.Subtitle>
                        <Text heavy style={{ color: "#7cc" }}>
                          {moment(
                            new Date(item.transaction_date.toDate())
                              .toISOString()
                              .split("T")[0]
                              .split("-")
                              .join("-")
                          )
                            .add({ days: 1, months: item.warranty })
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
              );
            }
          }}
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
