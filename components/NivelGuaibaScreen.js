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

// Tela principal do aplicativo - exibe o nível do Rio Guaíba em tempo real
// Componente funcional que gerencia estado de loading, dados e atualizações
// Integra com Firebase para receber dados atualizados do backend

const NivelGuaibaScreen = () => {
  // Estado para armazenar os dados do Firebase
  const [dados, setDados] = useState(null);
  // Estado para controlar o carregamento inicial
  const [loading, setLoading] = useState(true);
  // Estado para controlar o refresh manual
  const [refreshing, setRefreshing] = useState(false);

  // Efeito para configurar listener em tempo real do Firebase
  // Escuta mudanças na referência raiz do banco de dados
  // Atualiza o estado com novos dados e gerencia estados de loading

  useEffect(() => {
    // Cria referência para o nó raiz do banco de dados
    const dbRef = ref(database, "/");

    // Listener do Firebase - executa sempre que dados mudam
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

    // Cleanup function - remove listener quando componente desmonta
    return () => unsubscribe();
  }, []);

  // Handler para o gesto pull-to-refresh
  // Ativa estado de refreshing e simula recarregamento

  const onRefresh = () => {
    setRefreshing(true);
    // Timeout para simular recarregamento (em app real, recarregaria dados)
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Remove aspas dos textos vindos do Firebase
  // O Firebase adiciona aspas em alguns campos string
  const cleanText = (text) => {
    if (typeof text === "string") {
      return text.replace(/"/g, "");
    }
    return text;
  };

  // Estado de loading - exibe spinner enquanto dados carregam
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1e40af" />
        <Text style={styles.loadingText}>Carregando dados do Guaíba...</Text>
      </View>
    );
  }

  // Renderização principal da tela
  // ScrollView com refresh control para atualização manual
  // Seções: cabeçalho, nível principal, informações e rodapé
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Cabeçalho com título do aplicativo */}
      <View style={styles.header}>
        <Text style={styles.title}>NÍVEL DO RIO GUAÍBA</Text>
      </View>

      {/* Container principal com nível atual e timestamp */}
      <View style={styles.nivelContainer}>
        <Text style={styles.waveEmoji}>🌊</Text>
        <Text style={styles.nivel}>
          {dados?.nivel ? `${dados.nivel.toFixed(2)}m` : "--.--m"}
        </Text>
        <Text style={styles.timestamp}>
          {cleanText(dados?.timestamp) || "Carregando..."}
        </Text>
      </View>

      {/* Informações das cotas de alerta e inundação */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>{cleanText(dados?.labelCotaAlerta)}</Text>
        <Text style={styles.infoText}>
          {cleanText(dados?.labelCotaInundacao)}
        </Text>
        <Text style={styles.infoText}>{cleanText(dados?.labelEstacao)}</Text>
      </View>

      {/* Separador visual entre seções */}
      <View style={styles.separator} />

      {/* Rodapé com informações de fonte e versão */}
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
