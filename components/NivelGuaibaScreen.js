import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { database, ref, onValue } from "../firebase";

const NivelGuaibaScreen = () => {
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const dbRef = ref(database, "/");

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        console.log("Dados recebidos:", data); // Para debug
        setDados(data);
        setLoading(false);
        setRefreshing(false);
      },
      (error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
        setRefreshing(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Função para remover aspas dos textos do Firebase
  const cleanText = (text) => {
    if (typeof text === "string") {
      return text.replace(/"/g, "");
    }
    return text;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
        <Text style={styles.loadingText}>Carregando dados do Guaíba...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>NÍVEL DO RIO GUAÍBA</Text>
      </View>

      {/* Nível principal */}
      <View style={styles.nivelContainer}>
        <Text style={styles.nivel}>
          {dados?.nivel ? `${dados.nivel.toFixed(2)}m` : "--.--m"}
        </Text>
        <Text style={styles.timestamp}>
          {cleanText(dados?.timestamp) || "Carregando..."}
        </Text>
      </View>

      {/* Informações das cotas */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{cleanText(dados?.labelCotaAlerta)}</Text>
        <Text style={styles.infoText}>
          {cleanText(dados?.labelCotaInundacao)}
        </Text>
        <Text style={styles.infoText}>{cleanText(dados?.labelEstacao)}</Text>
      </View>

      {/* Separador */}
      <View style={styles.separator} />

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Fonte: https://www.ana.gov.br/ (SNIRH/ANA)
        </Text>
        <Text style={styles.footerText}>marcoengenhariaiot@gmail.com</Text>
        <Text style={styles.version}>{cleanText(dados?.labelVersao)}</Text>
        <Text style={styles.disclaimer}>{cleanText(dados?.labelFree)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    backgroundColor: "#1e40af",
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  nivelContainer: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#f8fafc",
  },
  nivel: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 10,
  },
  timestamp: {
    fontSize: 16,
    color: "#64748b",
  },
  infoContainer: {
    padding: 20,
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: "#374151",
    fontWeight: "500",
    marginTop: 10,
    marginBottom: 15,
  },
  disclaimer: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
    lineHeight: 16,
    fontStyle: "italic",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#64748b",
  },
});

export default NivelGuaibaScreen;
