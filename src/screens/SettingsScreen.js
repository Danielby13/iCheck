import React, { useContext } from "react";
import { View, Alert, ScrollView, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";

import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";

import styled from "styled-components";
import Text from "../components/Text";

const list = [
  {
    name: "שינוי פרטים אישיים",
    icon: "person",
    nav: "שינוי פרטים אישיים",
  },
  {
    name: "שיתוף כל החשבוניות",
    icon: "share",
    nav: "שיתוף כל החשבוניות",
  },

  {
    name: "תנאי שימוש",
    icon: "library-books",
    nav: "תנאי שימוש",
  },
  {
    name: "מדיניות אבטחה",
    icon: "security",
    nav: "מדיניות אבטחה",
  },

  {
    name: "איפוס חשבון",
    icon: "cached",
    nav: "איפוס חשבון",
  },

  {
    name: "מחיקת חשבון",
    icon: "highlight-off",
    nav: "מחיקת חשבון משתמש",
  },
];

export default SettingsScreen = () => {
  // settings menu, the user can navigate to change personal info, share all screen, terms screen, security policy, reset all screen and delete user
  const [user, setUser] = useContext(UserContext);
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
