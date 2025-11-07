import { StyleSheet } from "react-native";

// Stylesheet para o componente NivelGuaibaScreen
// Define todos os estilos visuais do aplicativo
// Utiliza Design System consistente com cores e espaçamentos

export const styles = StyleSheet.create({
  // Container principal - ocupa toda a tela
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // Container centralizado para estado de loading
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  // Cabeçalho com cor azul institucional
  header: {
    backgroundColor: "#1e40af", // Azul principal
    paddingVertical: 25,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4, // Sombra Android
    shadowColor: "#000", // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Título principal do aplicativo
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    letterSpacing: 1,
  },
  // Container do nível principal com fundo azul claro
  nivelContainer: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#f0f9ff", // Azul muito claro
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  // Emoji decorativo de onda
  waveEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  // Número do nível do rio - elemento mais importante visualmente
  nivel: {
    fontSize: 52,
    fontWeight: "bold",
    color: "#1e40af", // Azul principal
    marginBottom: 8,
    textShadowColor: "rgba(30, 64, 175, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  // Timestamp da última atualização
  timestamp: {
    fontSize: 16,
    color: "#64748b", // Cinza azulado
    fontStyle: "italic",
  },
  // Container de informações das cotas
  infoContainer: {
    padding: 25,
    alignItems: "center",
    backgroundColor: "#f8fafc", // Cinza muito claro
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  // Texto das informações
  infoText: {
    fontSize: 16,
    color: "#374151", // Cinza escuro
    marginBottom: 12,
    textAlign: "center",
    lineHeight: 22,
  },
  // Separador visual entre seções
  separator: {
    height: 1,
    backgroundColor: "#e2e8f0", // Cinza claro
    marginHorizontal: 20,
    marginVertical: 25,
  },
  // Rodapé com informações adicionais
  footer: {
    padding: 25,
    alignItems: "center",
    backgroundColor: "#f1f5f9", // Cinza azulado muito claro
    marginTop: 10,
  },
  // Texto do rodapé
  footerText: {
    fontSize: 14,
    color: "#475569", // Cinza médio
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 20,
  },
  // Versão do aplicativo
  version: {
    fontSize: 14,
    color: "#334155", // Cinza escuro
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 12,
  },
  // Disclaimer legal e informativo
  disclaimer: {
    fontSize: 12,
    color: "#64748b", // Cinza azulado
    textAlign: "center",
    lineHeight: 16,
    fontStyle: "italic",
    marginTop: 5,
  },
  // Texto de loading
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
  },
});
