require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

// =======================
// 🎯 WEB ADMIN - ROTAS
// =======================

// 🔑 Login do posto (gera token)
app.post("/posto/login", async (req, res) => {
  const { email, senha } = req.body;
  const resultado = await db.loginPosto(email, senha);
  if (!resultado.success)
    return res.status(401).json({ message: resultado.message });

  res.status(200).json({
    posto: resultado.posto,
    token: resultado.token,
  });
});

// ➕ Criar agendamento (protegido)
app.post("/posto/agendamentos", async (req, res) => {
  const { id_tipo_atendimento, data_hora_agendamento, quantidade_fichas } =
    req.body;

  const id_posto_saude = req.posto.id_posto_saude; // Pega direto do token

  const resultado = await db.criarAgendamento({
    id_posto_saude,
    id_tipo_atendimento,
    data_hora_agendamento,
    quantidade_fichas,
  });

  if (!resultado.success)
    return res.status(500).json({ message: resultado.message });

  res.status(201).json({ message: resultado.message });
});

// =======================
// 🎯 APP MOBILE - ROTAS
// =======================

// 🔐 Login Paciente (gera token)
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const resultado = await db.loginPaciente(email, senha);
  if (!resultado.success)
    return res.status(401).json({ message: resultado.message });

  res.status(200).json({
    paciente: resultado.paciente,
  });
});

// ➕ Cadastro Paciente
app.post("/cadastro", async (req, res) => {
  const paciente = req.body;
  const results = await db.cadastroPaciente(paciente);
  if (!results.success)
    return res.status(400).json({ message: results.message });

  res.status(201).json({ message: "Cadastrado com sucesso." });
});

// 🔍 Tipos de atendimento de um posto
app.get("/tipos/:idPosto", async (req, res) => {
  try {
    const id = parseInt(req.params.idPosto);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const tipos = await db.getTiposAtendimentoAgendamento(id);

    if (!tipos) {
      return res
        .status(404)
        .json({ message: "Tipos de atendimento não encontrados" });
    }

    res.json(tipos);
  } catch (error) {
    console.error("Erro no GET /tipos/:idPosto", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// 🔍 Detalhes do posto
app.get("/detalhesPosto/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const posto = await db.getPostosId(id);

    if (!posto) {
      return res.status(404).json({ message: "Posto não encontrado" });
    }

    res.json(posto);
  } catch (error) {
    console.error("Erro no GET /detalhesPosto/:id", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// 🔍 Lista todos os postos
app.get("/", async (req, res) => {
  const results = await db.getPostos();
  res.json(results);
});

// =======================
// 🚀 Servidor rodando
// =======================
app.listen(process.env.PORT, "192.168.85.166", () => {
  console.log("App is running!");
});
