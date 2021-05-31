/**
 * @jest-environment jsdom
 */
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import SignInScreen from "../src/screens/SignInScreen";
import { render, fireEvent } from "@testing-library/react-native";
jest.useFakeTimers();
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});
jest.mock("react-native-elements");
jest.mock("firebase/firestore");
configure({ adapter: new Adapter() });

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders correctly", () => {
  renderer.create(<App />);
});

it("should render the Sign In Screen without crashing", () => {
  const rendered = renderer.create(<SignInScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Sign Up Screen without crashing", () => {
  const rendered = renderer.create(<SignUpScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Share All Screen without crashing", () => {
  const rendered = renderer.create(<ShareAllScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Button Text Element", () => {
  const wrapper = shallow(<ShareAllScreen />);
  expect(wrapper.find("Button")).toHaveLength(3);
});

it("should render the Invoice History Screen without crashing", () => {
  const rendered = renderer.create(<ResetAllScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Change Personal Details Screen without crashing", () => {
  const rendered = renderer.create(<ChangePersonalDetailsScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Delete User Screen without crashing", () => {
  const rendered = renderer.create(<DeleteUserScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Terms Screen without crashing", () => {
  const rendered = renderer.create(<terms />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Terms Screen without crashing", () => {
  const rendered = renderer.create(<SecurityPolicyScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the FAQ Screen without crashing", () => {
  const rendered = renderer.create(<FAQScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render the Update Password Screen without crashing", () => {
  const rendered = renderer.create(<updatePasswordScreen />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render Update Personal Info Screen without crashing", () => {
  const rendered = renderer.create(<updatePersonalInfo />).toJSON();
  expect(rendered).toBeTruthy();
});

it("should render Invoice History Screen without crashing", () => {
  const rendered = renderer.create(<InvoiceHistory />).toJSON();
  expect(rendered).toBeTruthy();
});
