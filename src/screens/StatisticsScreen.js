import React, { useState, useContext, useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import "firebase/auth";
import "firebase/firestore";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Rect, Text as TextSVG, Svg } from "react-native-svg";
import { ListItem, Header, Icon, Button } from "react-native-elements";
import { UserContext } from "../context/UserContext";
import firebase from "firebase";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import ModalDropdown from "react-native-modal-dropdown";
import { Colors } from "react-native-paper";
import styled from "styled-components";
import Text from "../components/Text";

const chartConfig = {
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#b5e3e3",
  backgroundGradientTo: "#7ff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

export default StatisticsScreen = () => {
  let [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
  });

  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState([]);
  const [invoiceprev, setInvoiceprev] = useState([]);
  const [invoicethis, setInvoicethis] = useState([]);
  const [optionState, setOptionState] = useState("");
  const navigation = useNavigation();
  const [year, setYear] = useState(new Date().getFullYear());
  const [newyear, setnewyear] = useState(year);
  const [current_Year, setcurrent_Year] = useState(new Date(year, 0, 1));
  const [next_Year, setnext_Year] = useState(new Date(year + 1, 0, 1));
  const [prev_Year, setprev_Year] = useState(new Date(year - 1, 0, 1));
  const [sumMonth, setsumMonth] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [sumByCatagoty, setsumByCatagoty] = useState([
    { key: "בילוי ומסעדות", sum: 0 },
    { key: "חינוך ומשפחה", sum: 0 },
    { key: "תרבות ופנאי", sum: 0 },
    { key: "מזון ומשקאות", sum: 0 },
    { key: "ביגוד והנעלה", sum: 0 },
    { key: "יופי ואביזרי אופנה", sum: 0 },
    { key: "בריאות", sum: 0 },
    { key: "מוצרי חשמל ותקשורת", sum: 0 },
    { key: "בית וגן", sum: 0 },
    { key: "רכב ותחבורה", sum: 0 },
    { key: "מתנות ומזכרות", sum: 0 },
    { key: "שונות", sum: 0 },
  ]);
  const [sumMonththis, setsumMonththis] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [sumByCatagotythis, setsumByCatagotythis] = useState([
    { key: "בילוי ומסעדות", sum: 0 },
    { key: "חינוך ומשפחה", sum: 0 },
    { key: "תרבות ופנאי", sum: 0 },
    { key: "מזון ומשקאות", sum: 0 },
    { key: "ביגוד והנעלה", sum: 0 },
    { key: "יופי ואביזרי אופנה", sum: 0 },
    { key: "בריאות", sum: 0 },
    { key: "מוצרי חשמל ותקשורת", sum: 0 },
    { key: "בית וגן", sum: 0 },
    { key: "רכב ותחבורה", sum: 0 },
    { key: "מתנות ומזכרות", sum: 0 },
    { key: "שונות", sum: 0 },
  ]);
  const [sumMonthprev, setsumMonthprev] = useState([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
  ]);
  const [sumByCatagotyprev, setsumByCatagotyprev] = useState([
    { key: "בילוי ומסעדות", sum: 0 },
    { key: "חינוך ומשפחה", sum: 0 },
    { key: "תרבות ופנאי", sum: 0 },
    { key: "מזון ומשקאות", sum: 0 },
    { key: "ביגוד והנעלה", sum: 0 },
    { key: "יופי ואביזרי אופנה", sum: 0 },
    { key: "בריאות", sum: 0 },
    { key: "מוצרי חשמל ותקשורת", sum: 0 },
    { key: "בית וגן", sum: 0 },
    { key: "רכב ותחבורה", sum: 0 },
    { key: "מתנות ומזכרות", sum: 0 },
    { key: "שונות", sum: 0 },
  ]);

  let data_linechart = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: sumMonth,
        strokeWidth: 4, // optional
      },
    ],
  };

  let piedata = [
    {
      name: sumByCatagoty[0].key,
      population: sumByCatagoty[0].sum,
      color: "#40E0D0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[1].key,
      population: sumByCatagoty[1].sum,
      color: "#7cf",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[2].key,
      population: sumByCatagoty[2].sum,
      color: "#DC143C",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[3].key,
      population: sumByCatagoty[3].sum,
      color: "#DA70D6",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[4].key,
      population: sumByCatagoty[4].sum,
      color: "#FF69B4",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[5].key,
      population: sumByCatagoty[5].sum,
      color: "#FFC0CB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[6].key,
      population: sumByCatagoty[6].sum,
      color: "#4B0082",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[7].key,
      population: sumByCatagoty[7].sum,
      color: "#7B68EE",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[8].key,
      population: sumByCatagoty[8].sum,
      color: "#4169E1",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[9].key,
      population: sumByCatagoty[9].sum,
      color: "#00BFFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[10].key,
      population: sumByCatagoty[10].sum,
      color: "#00FFFF",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: sumByCatagoty[11].key,
      population: sumByCatagoty[11].sum,
      color: "#20B2AA",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
  ];

  useEffect(() => {
    function getID(category) {
      if (category == "בילוי ומסעדות") return 0;
      else if (category == "חינוך ומשפחה") return 1;
      else if (category == "תרבות ופנאי") return 2;
      else if (category == "מזון ומשקאות") return 3;
      else if (category == "ביגוד והנעלה") return 4;
      else if (category == "יופי ואביזרי אופנה") return 5;
      else if (category == "בריאות") return 6;
      else if (category == "מוצרי חשמל ותקשורת") return 7;
      else if (category == "בית וגן") return 8;
      else if (category == "רכב ותחבורה") return 9;
      else if (category == "מתנות ומזכרות") return 10;
      else if (category == "שונות") return 11;
      else return 11;
    }
    function getCurrectMonth(value) {
      const str = value.split("-");
      return parseInt(str[1]);
    }

    const db = firebase
      .firestore()
      .collection("invoices")
      .where("customer_id", "==", user.uid)
      .where("approved_status", "==", 0)
      .where("transaction_date", ">", current_Year)
      .where("transaction_date", "<=", next_Year)
      .orderBy("transaction_date", "desc")
      .onSnapshot((querySnapshot) => {
        const list_this = [];
        const sumMonththis = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const sumByCatagotythis = [
          { key: "בילוי ומסעדות", sum: 0 },
          { key: "חינוך ומשפחה", sum: 0 },
          { key: "תרבות ופנאי", sum: 0 },
          { key: "מזון ומשקאות", sum: 0 },
          { key: "ביגוד והנעלה", sum: 0 },
          { key: "יופי ואביזרי אופנה", sum: 0 },
          { key: "בריאות", sum: 0 },
          { key: "מוצרי חשמל ותקשורת", sum: 0 },
          { key: "בית וגן", sum: 0 },
          { key: "רכב ותחבורה", sum: 0 },
          { key: "מתנות ומזכרות", sum: 0 },
          { key: "שונות", sum: 0 },
        ];
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
          sumMonththis[getmonth - 1] += docSnapshot.data().total_amount;
          sumByCatagotythis[
            getID(docSnapshot.data().category)
          ].sum += docSnapshot.data().total_amount;
        });
        setsumByCatagotythis(sumByCatagotythis);
        setsumMonththis(sumMonththis);
        setsumByCatagoty(sumByCatagotythis);
        setsumMonth(sumMonththis);
        setInvoicethis(list_this);
        setInvoice(list_this);
        setLoading(false);
      });
    const db2 = firebase
      .firestore()
      .collection("invoices")
      .where("customer_id", "==", user.uid)
      .where("approved_status", "==", 0)
      .where("transaction_date", ">", prev_Year)
      .where("transaction_date", "<=", current_Year)
      .orderBy("transaction_date", "desc")
      .onSnapshot((querySnapshot) => {
        const list_prev = [];
        const sumMonthprev = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        const sumByCatagotyprev = [
          { key: "בילוי ומסעדות", sum: 0 },
          { key: "חינוך ומשפחה", sum: 0 },
          { key: "תרבות ופנאי", sum: 0 },
          { key: "מזון ומשקאות", sum: 0 },
          { key: "ביגוד והנעלה", sum: 0 },
          { key: "יופי ואביזרי אופנה", sum: 0 },
          { key: "בריאות", sum: 0 },
          { key: "מוצרי חשמל ותקשורת", sum: 0 },
          { key: "בית וגן", sum: 0 },
          { key: "רכב ותחבורה", sum: 0 },
          { key: "מתנות ומזכרות", sum: 0 },
          { key: "שונות", sum: 0 },
        ];
        querySnapshot.forEach((docSnapshot) => {
          list_prev.push({ ...docSnapshot.data(), key: docSnapshot.id });
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
          sumMonthprev[getmonth - 1] += docSnapshot.data().total_amount;
          sumByCatagotyprev[
            getID(docSnapshot.data().category)
          ].sum += docSnapshot.data().total_amount;
        });
        setsumByCatagotyprev(sumByCatagotyprev);
        setsumMonthprev(sumMonthprev);
        setInvoiceprev(list_prev);
        setLoading(false);
      });
    //return () => db();
  }, []);

  const showthisyear = async () => {
    setsumByCatagoty(sumByCatagotythis);
    setsumMonth(sumMonththis);
    setInvoice(invoicethis);
    setnewyear(year);
  };
  const showprevyear = async () => {
    setsumByCatagoty(sumByCatagotyprev);
    setsumMonth(sumMonthprev);
    setInvoice(invoiceprev);
    setnewyear(year - 1);
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.row}>
          <Text medium center heavy>
            סטטיסטיקת הוצאות לשנת: {newyear}
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 50 }}>
            <View style={styles.buttonStyleThisYear}>
              <Button
                type="outline"
                raised
                onPress={() => showthisyear()}
                title={year}
              />
            </View>
            <View style={styles.buttonStylePrevYear}>
              <Button
                type="outline"
                raised
                onPress={() => showprevyear()}
                title={year - 1}
              />
            </View>
          </View>
        </View>
        <Container>
          <LineChart
            data={data_linechart}
            width={Dimensions.get("window").width}
            height={270}
            yAxisLabel="₪"
            yAxisInterval={1}
            segments={8}
            withInnerLines={false}
            withOuterLines={true}
            bezier
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "#87CEEB",
              backgroundGradientTo: "#00BFFF",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 0,
              },
              propsForDots: {
                r: "4",
                strokeWidth: "0",
                stroke: "#fbfbfb",
              },
              fillShadowGradient: "#E6E6FA",
              fillShadowGradientOpacity: 10,
            }}
            style={{
              marginVertical: 15,
              borderRadius: 20,
            }}
            decorator={() => {
              return tooltipPos.visible ? (
                <View>
                  <Svg>
                    <Rect
                      x={tooltipPos.x - 27}
                      y={tooltipPos.y + 10}
                      width="60"
                      height="20"
                      fill="transparent"
                    />
                    <TextSVG
                      x={tooltipPos.x + 5}
                      y={tooltipPos.y + 20}
                      fill="black"
                      fontSize="15"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {Math.round(tooltipPos.value)}
                    </TextSVG>
                  </Svg>
                </View>
              ) : null;
            }}
            onDataPointClick={(data) => {
              let isSamePoint =
                tooltipPos.x === data.x && tooltipPos.y === data.y;

              isSamePoint
                ? setTooltipPos((previousState) => {
                    return {
                      ...previousState,
                      value: data.value,
                      visible: !previousState.visible,
                    };
                  })
                : setTooltipPos({
                    x: data.x,
                    value: data.value,
                    y: data.y,
                    visible: true,
                  });
            }}
          />
          <PieChart
            data={piedata}
            width={Dimensions.get("window").width}
            height={256}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"-5"}
            center={[10, 5]}
            bezier
          />
        </Container>
        <Text medium left heavy margin="16px 0 20px 10px">
          החשבוניות :
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
                  <ListItem.Title>
                    <Text heavy medium>
                      {" "}
                      {item.category}
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
`;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
  buttonContainer: {
    flex: 1,
    borderColor: "transparent",
  },
  buttonStyleThisYear: {
    position: "absolute",
    width: 150,
    left: 50,
  },
  buttonStylePrevYear: {
    position: "absolute",
    width: 150,
    right: 50,
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
    height: 69,
    flexGrow: 1,
    backgroundColor: Colors.blue300,
    borderRadius: 3,
    borderColor: "red",
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
});
