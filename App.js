import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NivelGuaibaScreen from "./components/NivelGuaibaScreen";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
        <StatusBar style="auto" />
        <NivelGuaibaScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
