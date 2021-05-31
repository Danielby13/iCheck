import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Alert,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ListItem, Icon, Header } from "react-native-elements";
import { LineChart } from "react-native-chart-kit";
import { UserContext } from "../context/UserContext";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components";
import Text from "../components/Text";

const chartConfig = {
  backgroundColor: "white",
  backgroundGradientFrom: "#87CEEB",
  backgroundGradientTo: "#00BFFF",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  fillShadowGradient: "#E6E6FA",
  fillShadowGradientOpacity: 10,
  propsForDots: {
    r: "3.5",
    strokeWidth: "1",
    stroke: "white",
  },
};

export default HomeScreen = () => {
  // the default screen, the user can see sample of distribution of his expenses, also the user can see 10 of his last invoices
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [current_Year, setcurrent_Year] = useState(new Date(year, 0, 1));
  const [next_Year, setnext_Year] = useState(new Date(year + 1, 0, 1));
  const navigation = useNavigation();
  const [sumMonth, setsumMonth] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  let data = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: sumMonth,
        strokeWidth: 2,
      },
    ],
  };

  useEffect(() => {
    function getCurrectMonth(value) {
      const str = value.split("-");
      return parseInt(str[1]);
    }
    const db = firebase
      .firestore()
      .collection("invoices")
      .where("customer_id", "==", user.uid)
      .where("approved_status", "==", 0)
      .orderBy("transaction_date", "desc")
      .limit(10)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((docSnapshot) => {
          list.push({ ...docSnapshot.data(), key: docSnapshot.id });
        });
        setInvoice(list);
        setLoading(false);
      });
    const db2 = firebase
      .firestore()
      .collection("invoices")
      .where("customer_id", "==", user.uid)
      .where("approved_status", "==", 0)
      .where("transaction_date", ">", current_Year)
      .where("transaction_date", "<=", next_Year)
      .orderBy("transaction_date", "desc")
      .onSnapshot((querySnapshot) => {
        const list_this = [];
        const sumMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        querySnapshot.forEach((docSnapshot) => {
          list_this.push({ ...docSnapshot.data(), key: docSnapshot.id });
          const getmonth = getCurrectMonth(
            docSnapshot
              .data()
              .transaction_date.toDate()
              .toISOString()
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-")
          );
          sumMonth[getmonth - 1] += docSnapshot.data().total_amount;
        });
        setsumMonth(sumMonth);
        setLoading(false);
      });
    return () => db();
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <ScrollView>
        <Text center large heavy left margin="10px 0 0 0px">
          שלום {user.firstName}
          {"\n"}
        </Text>
        <Container>
          <Text medium center heavy>
            הוצאות מהשנה הנוכחית
          </Text>
          <LineChart
            data={data}
            width={Dimensions.get("window").width}
            height={270}
            chartConfig={chartConfig}
            withInnerLines={false}
            withOuterLines={true}
            style={{
              marginVertical: 10,
              borderRadius: 20,
            }}
            bezier
            yAxisLabel="₪"
          />
        </Container>
        <Text medium left heavy margin="16px 0 20px 10px">
          10 החשבוניות האחרונות:
        </Text>
        <FlatList
          data={invoice}
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

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  width: 100%;
  padding: 6px;
  margin-top: -20px;
`;
