import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";

import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { Image, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import InvoiceHistory from "../screens/InvoiceHistory";
import SettingsScreen from "../screens/SettingsScreen";
import DetailedInvoiceScreen from "../screens/DetailedInvoiceScreen";
import InsertNewInvoice from "../screens/InsertNewInvoice";
import WarrantyInvoice from "../screens/WarrantyInvoice";
import ConfirmInvoiceScreen from "../screens/ConfirmInvoiceScreen";
import ShareAllScreen from "../screens/ShareAllScreen";
import QRscannerScreen from "../screens/QRscannerScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import ResetAllScreen from "../screens/ResetAllScreen";
import ChangePersonalDetailsScreen from "../screens/ChangePersonalDetailsScreen";
import DeleteUserScreen from "../screens/DeleteUserScreen";
import terms from "../screens/terms";
import SecurityPolicyScreen from "../screens/SecurityPolicyScreen";
import FAQScreen from "../screens/FAQScreen";
import updatePasswordScreen from "../screens/changePersonalDataComp/updatePasswordScreen";
import updatePersonalInfo from "../screens/changePersonalDataComp/updatePersonalInfo";
import { UserContext } from "../context/UserContext";
import { FirebaseContext } from "../context/FirebaseContext";

const Stack = createStackNavigator();

const Screens = ({ navigation }) => {
  return (
    // create stack navigation for easy navigation between screens in the app
    <Stack.Navigator
      screenOptions={{
        headerTransparent: false,
        headerLeft: () => (
          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="menu" size={32} color="black" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="דף הבית"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="היסטוריית חשבוניות"
        component={InvoiceHistory}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="סטטיסטיקת הוצאות"
        component={StatisticsScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="מוצרים באחריות"
        component={WarrantyInvoice}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="זיכויים"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="חשבוניות לאישור"
        component={ConfirmInvoiceScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="צור קשר"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="שאלות ותשובות"
        component={FAQScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="הגדרות"
        component={SettingsScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="תנאי שימוש"
        component={terms}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="חשבונית מפורטת"
        component={DetailedInvoiceScreen}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="יצירת חשבונית חדשה"
        component={InsertNewInvoice}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="שיתוף כל החשבוניות"
        component={ShareAllScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="סריקת חשבונית"
        component={QRscannerScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="איפוס חשבון"
        component={ResetAllScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="שינוי פרטים אישיים"
        component={ChangePersonalDetailsScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="מחיקת חשבון משתמש"
        component={DeleteUserScreen}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="שינוי סיסמה"
        component={updatePasswordScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="שינוי שם פרטי ומשפחה"
        component={updatePersonalInfo}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="מדיניות אבטחה"
        component={SecurityPolicyScreen}
      />
    </Stack.Navigator>
  );
};

const DrawerContent = (props) => {
  // iCheck logo in the drawer and all the screens the user can navigate to
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 180, height: 52 }}
          // resizeMode="center"
        />
        <Text>חשבוניות דיגיטליות</Text>
      </View>
      <DrawerItem
        label="דף הבית"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("דף הבית")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-home"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="היסטוריית חשבוניות"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("היסטוריית חשבוניות")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-newspaper"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="סטטיסטיקת הוצאות"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("סטטיסטיקת הוצאות")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-stats-chart"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="מוצרים באחריות"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("מוצרים באחריות")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-shield-checkmark"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="חשבוניות לאישור"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("חשבוניות לאישור")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-checkbox"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />
      <DrawerItem
        label="יצירת חשבונית חדשה"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("יצירת חשבונית חדשה")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-add-circle"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />
      <DrawerItem
        label="סריקת חשבונית"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("סריקת חשבונית")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-qr-code"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />
      <DrawerItem
        label="צור קשר"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("צור קשר")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-mail"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="שאלות ותשובות"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("שאלות ותשובות")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-help-circle"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="הגדרות"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("הגדרות")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-settings"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />
    </DrawerContentScrollView>
  );
};
export default MainStackScreens = () => {
  // log out function in drawer
  const MainStack = createDrawerNavigator();
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const logOut = async () => {
    const loggedOut = await firebase.logOut();
    if (loggedOut) {
      setUser((state) => ({ ...state, isLoggedIn: false }));
    }
  };
  return (
    <MainStack.Navigator
      initialRouteName="Home"
      drawerPosition="right"
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerContent {...props} />
            <DrawerItem
              activeBackgroundColor="rgba(0, 0, 0, .04)"
              label="התנתקות"
              labelStyle={{ marginLeft: -16 }}
              onPress={logOut}
              icon={({ focused, size }) => (
                <Ionicons
                  name="ios-log-out"
                  size={size}
                  color={focused ? "#ccc" : "#7cc"}
                />
              )}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <MainStack.Screen name="Screens" component={Screens} />
    </MainStack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    margin: 20,
  },
  menu: {
    margin: 20,
  },
});
