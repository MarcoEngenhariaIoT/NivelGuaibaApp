import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { database, ref, onValue } from "../firebase";
import { styles } from "../styles/NivelGuaibaStyles";

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
        console.log("Dados recebidos:", data);
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
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>NÍVEL DO RIO GUAÍBA</Text>
      </View>

      {/* Nível principal */}
      <View style={styles.nivelContainer}>
        <Text style={styles.waveEmoji}>🌊</Text>
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

export default NivelGuaibaScreen;
