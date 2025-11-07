import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Configuração e inicialização do Firebase Realtime Database
// Contém as credenciais de conexão com o projeto Firebase
// Exporta as instâncias e funções necessárias para o aplicativo

const firebaseConfig = {
  databaseURL: "https://guaiba-ddf2d-default-rtdb.firebaseio.com/",
};

// Inicializa o app Firebase com as configurações
const app = initializeApp(firebaseConfig);

// Obtém a instância do Realtime Database
const database = getDatabase(app);

// Exporta as dependências do Firebase para uso nos componentes
export { database, ref, onValue };
