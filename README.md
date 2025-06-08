# Aplicativo de Agendamento de UBS (Unidades Básicas de Saúde)

Este projeto é um sistema integrado para facilitar o acesso da população aos serviços de saúde pública. Ele é composto por:

- 📱 Um **aplicativo mobile** para pacientes (desenvolvido em **React Native**)
- 🌐 Uma **API REST** (desenvolvida em **Node.js**)
- 🧠 Um **banco de dados MySQL**
- 💻 Um **sistema web administrativo** (HTML, CSS e JavaScript puros)

---

## 🩺 Objetivo

O sistema tem como foco permitir que **pacientes localizem os postos de saúde mais próximos utilizando GPS**, realizem **agendamentos médicos**, e acompanhem seus horários. Ao mesmo tempo, os **administradores** terão uma plataforma web para gerenciar **postos, horários, atendimentos e especialidades**.

---

## 📲 Tecnologias Utilizadas

| Componente          | Tecnologia               |
| ------------------- | ------------------------ |
| Mobile              | React Native + Expo      |
| Backend/API         | Node.js + Express        |
| Banco de Dados      | MySQL                    |
| Web Admin           | HTML + CSS + JS          |
| Estado Global (App) | Zustand                  |
| Armazenamento local | AsyncStorage             |
| Máscaras de entrada | react-native-masked-text |

---

## 🔗 Funcionalidades do Projeto

### Paciente (App Mobile)

- Cadastro com dados pessoais e número do SUS
- Login com e-mail e senha
- Localização automática via GPS
- Exibição dos postos mais próximos por distância
- Visualização de detalhes dos postos
- Agendamento de atendimentos por especialidade
- Consulta e cancelamento dos seus agendamentos

### Administrador (Web)

- Login no sistema administrativo
- Cadastro e edição de postos de saúde
- Gerenciamento de especialidades e horários
- Lista de pacientes agendados por data

---

## 📌 Requisitos Funcionais

| ID    | Descrição                                            | Atores         | Prioridade |
| ----- | ---------------------------------------------------- | -------------- | ---------- |
| RF001 | Cadastro de usuários com dados pessoais e cartão SUS | Paciente       | Alta       |
| RF002 | Login com e-mail e senha                             | Paciente/Admin | Alta       |
| RF003 | Localização automática via GPS                       | Paciente       | Alta       |
| RF004 | Lista de postos ordenados por distância              | Paciente       | Alta       |
| RF005 | Detalhamento de informações de postos                | Paciente       | Média      |
| RF006 | Agendamento de consultas                             | Paciente       | Alta       |
| RF007 | Seleção de especialidades médicas                    | Paciente       | Alta       |
| RF008 | Lista de pacientes agendados no dia                  | Administrador  | Média      |
| RF009 | Cadastro e gerenciamento de postos                   | Administrador  | Alta       |

---

## 🔒 Requisitos Não Funcionais

- Interface intuitiva e acessível
- Respostas em até 2 segundos
- Disponibilidade para Android
- Conformidade com a LGPD
- Integração futura com sistemas do SUS

---

## 🧩 Estrutura do Banco de Dados

```sql
CREATE TABLE postos_saude (
    id_posto_saude INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    endereco VARCHAR(255),
    telefone VARCHAR(15),
    horario_funcionamento VARCHAR(45),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255)
);

CREATE TABLE pacientes (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    cpf VARCHAR(11) UNIQUE,
    telefone VARCHAR(20),
    num_sus VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    senha VARCHAR(255)
);

CREATE TABLE tipos_atendimento (
    id_tipo_atendimento INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(255)
);

CREATE TABLE agendamentos (
    id_agendamento INT AUTO_INCREMENT PRIMARY KEY,
    id_posto_saude INT,
    id_tipo_atendimento INT,
    data_hora_agendamento DATETIME,
    quantidade_fichas INT,
    FOREIGN KEY (id_posto_saude) REFERENCES postos_saude(id_posto_saude),
    FOREIGN KEY (id_tipo_atendimento) REFERENCES tipos_atendimento(id_tipo_atendimento)
);

CREATE TABLE agendamentos_pacientes (
    id_agendamentos_pacientes INT AUTO_INCREMENT PRIMARY KEY,
    id_agendamento INT,
    id_paciente INT,
    agendado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_agendamento) REFERENCES agendamentos(id_agendamento),
    FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente) ON DELETE CASCADE
);
```

---

## 🚀 Como Rodar o Projeto

### Backend (API Node.js)

```bash
cd backend
npm install
npm run dev
```

Configure seu `.env` com:

```
DATABASE_URL=mysql://usuario:senha@localhost:3306/nome_do_banco
```

### App Mobile (React Native)

```bash
cd app_agendamento-UBS
npm install
npx expo start
```

> Use o **Expo Go** no celular para escanear o QR Code.

### Web Admin

Basta abrir o `index.html` na pasta do projeto web com um servidor local (ex: Live Server).

---

## 🔐 Autenticação

- Pacientes e administradores fazem login via e-mail e senha.
- Os dados são salvos no `AsyncStorage` no app.
- Os dados são criptografados e seguem os princípios da LGPD.

---

## 📦 Futuras Melhorias

- Integração com a API do SUS
- Envio de notificações push
- Exportação de relatórios em PDF
- Login com Gov.br

---

## 👨‍💻 Desenvolvedores

Este projeto está sendo desenvolvido como solução prática para melhoria do acesso à saúde pública através da tecnologia.
