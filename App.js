import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox, StyleSheet, Text, View } from "react-native";
import Main from "./components/MainComponent";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([""]);

export default function App() {
  return <Main />;
}
