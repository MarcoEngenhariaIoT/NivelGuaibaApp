import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NivelGuaibaScreen from "./components/NivelGuaibaScreen";

// Componente principal do aplicativo Nível Guaíba
// Configura a estrutura base com SafeAreaView e StatusBar
// Renderiza a tela principal de monitoramento do nível do rio

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
