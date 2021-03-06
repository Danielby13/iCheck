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
        name="???? ????????"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????????????? ????????????????"
        component={InvoiceHistory}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????????????? ????????????"
        component={StatisticsScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="???????????? ??????????????"
        component={WarrantyInvoice}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="??????????????"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="???????????????? ????????????"
        component={ConfirmInvoiceScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????? ??????"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ??????????????"
        component={FAQScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="????????????"
        component={SettingsScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="???????? ??????????"
        component={terms}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????????? ????????????"
        component={DetailedInvoiceScreen}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ?????????????? ????????"
        component={InsertNewInvoice}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ???? ??????????????????"
        component={ShareAllScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ??????????????"
        component={QRscannerScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ??????????"
        component={ResetAllScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ?????????? ????????????"
        component={ChangePersonalDetailsScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ?????????? ??????????"
        component={DeleteUserScreen}
      />
      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ??????????"
        component={updatePasswordScreen}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????? ???? ???????? ????????????"
        component={updatePersonalInfo}
      />

      <Stack.Screen
        options={{
          alignItems: "center",
        }}
        name="?????????????? ??????????"
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
        <Text>???????????????? ??????????????????</Text>
      </View>
      <DrawerItem
        label="???? ????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("???? ????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-home"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="?????????????????? ????????????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("?????????????????? ????????????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-newspaper"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="?????????????????? ????????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("?????????????????? ????????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-stats-chart"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="???????????? ??????????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("???????????? ??????????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-shield-checkmark"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="???????????????? ????????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("???????????????? ????????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-checkbox"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />
      <DrawerItem
        label="?????????? ?????????????? ????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("?????????? ?????????????? ????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-add-circle"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />
      <DrawerItem
        label="?????????? ??????????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("?????????? ??????????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-qr-code"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />
      <DrawerItem
        label="?????? ??????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("?????? ??????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-mail"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="?????????? ??????????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("?????????? ??????????????")}
        icon={({ focused, size }) => (
          <Ionicons
            name="ios-help-circle"
            size={size}
            color={focused ? "#ccc" : "#7cc"}
          />
        )}
      />

      <DrawerItem
        label="????????????"
        labelStyle={{ marginLeft: -16 }}
        onPress={() => props.navigation.navigate("????????????")}
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
              label="??????????????"
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
