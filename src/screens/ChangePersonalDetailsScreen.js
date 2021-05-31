import React, { useContext } from "react";
import { View, Alert, ScrollView, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components";
import Text from "../components/Text";

const list = [
  {
    name: "שינוי סיסמה",
    icon: "https",
    nav: "שינוי סיסמה",
  },

  {
    name: "שינוי שם פרטי ומשפחה",
    icon: "face",
    nav: "שינוי שם פרטי ומשפחה",
  },
];

export default ChangePersonalDetailsScreen = () => {
  // change personal details navigation menu for updating password or private name or last name
  const navigation = useNavigation();
  return (
    <View>
      <ScrollView>
        <Text large heavy left />
        {list.map((l, i) => (
          <ListItem
            key={i}
            bottomDivider
            button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate(l.nav);
            }}
            contentContainerStyle={styles.listView}
          >
            <Icon name={l.icon} size={30} />
            <ListItem.Content>
              <ListItem.Title>{l.name}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};
var styles = StyleSheet.create({
  listView: {
    flex: 1,
    justifyContent: "center",
  },
});
