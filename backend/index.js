require("dotenv").config();

const express = require("express");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(express.json());

app.post("/pacientes/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await db.loginPaciente(email, senha);

    if (!resultado.success) {
      return res.status(401).json({ message: resultado.message });
    }

    return res.status(200).json({
      message: resultado.message,
      paciente: resultado.paciente,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

app.post("/pacientes/cadastro", async (req, res) => {
  const paciente = req.body;
  const results = await db.cadastroPaciente(paciente);

  if (!results.success) {
    return res.status(400).json({ message: "Erro ao cadastrar." });
  }

  return res.status(201).json({ message: "Cadastrado com sucesso." });
});

app.post("/postos/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const resultado = await db.loginPosto(email, senha);

    if (!resultado.success) {
      return res.status(401).json({ message: resultado.message });
    }

    return res.status(200).json({
      message: resultado.message,
      posto: resultado.posto,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro interno no servidor." });
  }
});

app.get("postos/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const results = await db.selectPostosId(id);
  res.json(results);
});

app.get("/", async (req, res) => {
  const results = await db.selectPostos();
  res.json(results);
});

app.listen(process.env.PORT, "192.168.0.72", () => {
  console.log("App is running!");
});
