# NivelGuaibaApp

## Descrição do Projeto

Sistema completo de monitoramento do nível do Rio Guaíba em tempo real, composto por:

- **Backend Python**: Coleta dados da Agência Nacional de Águas (ANA) e envia para Firebase
- **Aplicativo Mobile**: Exibe informações atualizadas do nível do rio para usuários

## Arquitetura do Sistema

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   API ANA       │───▶│   Backend Python  │───▶│   Firebase      │
│   (Fonte dados) │    │   (apiANA.py)     │    │   (Realtime DB) │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                       │
┌─────────────────┐                                  │
│   App Mobile    │◀─────────────────────────────────┘
│   (React Native)│
└─────────────────┘
```

## Estrutura do Projeto

### Backend (Coleta de Dados)

```
apiANA/
├── apiANA.py                 # Serviço principal de coleta
├── firebase.log             # Configuração do Firebase
├── caisMaua.log            # Credenciais API ANA
└── nivel.json              # Cache local dos dados
```

### Frontend (Aplicativo Mobile)

```
NIVELGUAIBAAPP/
├── components/
│   └── NivelGuaibaScreen.js # Tela principal do aplicativo
├── styles/
│   └── NivelGuaibaStyles.js # Estilos da aplicação
├── firebase.js             # Configuração do Firebase
├── App.js                  # Componente principal
└── assets/                 # Recursos visuais
```

## Funcionalidades

### Backend (apiANA.py)

- Coleta automática de dados da ANA a cada 15 minutos
- Autenticação via API oficial da Agência Nacional de Águas
- Processamento e conversão de unidades (cm → m)
- Detecção de mudanças significativas nos níveis
- Integração com Firebase Realtime Database
- Padrão Singleton para instância única
- Tratamento robusto de erros e exceções

### Aplicativo Mobile

- Exibição em tempo real do nível do Rio Guaíba
- Interface responsiva e intuitiva
- Atualização por pull-to-refresh
- Indicadores de cotas de alerta e inundação
- Informações da estação de medição
- Modo offline com cache de dados

## Tecnologias Utilizadas

### Backend

- Python 3.x
- Firebase Admin SDK
- Requests (HTTP client)
- Schedule (agendamento de tarefas)

### Frontend

- React Native
- Expo
- Firebase JavaScript SDK
- React Native Safe Area Context

## Configuração e Instalação

### Pré-requisitos

- Python 3.8+
- Node.js 16+
- Expo CLI
- Conta Firebase
- Credenciais de acesso à API ANA

### Comandos de Inicialização do Projeto

#### Criar novo projeto Expo

```bash
npx create-expo-app --template
```

Quando perguntado: "What is your app named?" digite: **NivelGuaibaApp**

#### Instalar dependências específicas

```bash
# Navegar para o diretório do projeto
cd NivelGuaibaApp

# Instalar dependências do React DOM
npm install react-dom@19.1.0 --legacy-peer-deps

# Instalar React Native Web
npm install react-native-web@^0.21.0 --legacy-peer-deps

# Verificar e corrigir versões do React
npm install react@19.1.0 --legacy-peer-deps

# Instalar type script caso necessário se houver erro
npm install @types/react@~19.1.10 --legacy-peer-deps
npm install typescript@~5.9.2 --legacy-peer-deps

# Instalar contexto de área segura
npm install react-native-safe-area-context --legacy-peer-deps

# Instalar Firebase
npm install firebase

# Iniciar aplicativo
npm start
```

### Configuração do Backend

**Repositório backend**: https://github.com/MarcoEngenhariaIoT/apiANA

1. **Clonar repositório e instalar dependências Python:**

```bash
# Clonar repositório
git clone https://github.com/MarcoEngenhariaIoT/apiANA.git
cd apiANA

# Instalar dependências
pip install firebase-admin requests schedule
```

2. **Configurar arquivos de credenciais:**

Criar arquivo `apiANA/firebase.log`:

```json
{
  "firebase_config": "/caminho/para/serviceAccountKey.json",
  "databaseURL": "https://seu-projeto.firebaseio.com"
}
```

Criar arquivo `apiANA/caisMaua.log`:

```json
{
  "identificador": "seu_usuario_ANA",
  "senha": "sua_senha_ANA",
  "codigo_estacao": "87450004"
}
```

3. **Executar serviço:**

```bash
python apiANA.py
```

O serviço iniciará automaticamente e executará coletas a cada 15 minutos.

### Configuração do Aplicativo Mobile

**Configurar Firebase:**
Editar `firebase.js` com suas credenciais:

```javascript
const firebaseConfig = {
  databaseURL: "https://seu-projeto.firebaseio.com/",
};
```

## Dados Coletados

O sistema monitora e disponibiliza as seguintes informações:

- Nível atual do Rio Guaíba (metros)
- Timestamp da última medição
- Cota de alerta (3.15m)
- Cota de inundação (3.60m)
- Informações da estação (Cais Mauá C6)
- Metadados da aplicação

## API da ANA

### Endpoints Utilizados

- **Autenticação**: `/EstacoesTelemetricas/OAUth/v1`
- **Dados da Estação**: `/EstacoesTelemetricas/HidroinfoanaSerieTelemetricaDetalhada/v1`

### Parâmetros de Coleta

- Estação: Cais Mauá C6 (87450004)
- Intervalo: 15 minutos
- Filtro por data de atualização

## Aspectos Legais e Responsabilidade

### Coleta de Dados

- Os dados são coletados da API pública da Agência Nacional de Águas (ANA)
- Este projeto é um intermediário de acesso aos dados oficiais
- Não há armazenamento de dados sensíveis

### Uso de APIs e Serviços

- **API ANA**: Utilizada conforme termos de uso do SNIRH/ANA
- **Firebase**: Utilizado dentro dos limites do plano gratuito para fins educacionais
- **React Native/Expo**: Frameworks de código aberto sob licenças permissivas

### Isenção de Responsabilidade

```
ESTE PROJETO FOI DESENVOLVIDO PARA FINS EXCLUSIVAMENTE ACADÊMICOS E EDUCACIONAIS.

Os dados apresentados podem conter inconsistências e não substituem fontes oficiais.
Para tomada de decisões que envolvam segurança pública ou gestão de recursos hídricos,
recomenda-se consultar diretamente os canais oficiais da ANA (www.ana.gov.br).

O desenvolvedor não se responsabiliza por:
- Erros nos dados coletados da API ANA
- Decisões tomadas com base nas informações apresentadas
- Uso inadequado do aplicativo
- Problemas técnicos em dispositivos dos usuários
- Utilize esses códigos por conta e risco
```

## Desenvolvimento Acadêmico

Este projeto foi desenvolvido como critério de avaliação para a disciplina de **Programação Para Dispositivos Móveis em Android** do curso de Engenharia de Software da Faculdade Estácio.

### Objetivos Educacionais

- Aplicação de conceitos de programação móvel
- Integração com APIs RESTful
- Desenvolvimento full-stack
- Gestão de projetos de software
- Trabalho com dados em tempo real

## Contato e Suporte

- **Email**: marcoengenhariaiot@gmail.com
- **Backend**: https://github.com/MarcoEngenhariaIoT/apiANA
- **Fonte oficial**: https://www.ana.gov.br/ (SNIRH/ANA)

## Versão

Sistema: Versão 2.1.1

---

**Nota**: Este projeto tem caráter educacional e experimental, servindo como demonstração de integração entre sistemas de monitoramento ambiental e aplicações móveis.
