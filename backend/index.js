require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();
app.use(express.json());

//WEB ADMIN
app.post("/postos/login", async (req, res) => {
  const { email, senha } = req.body;
  const resultado = await db.loginPosto(email, senha);
  if (!resultado.success)
    return res.status(401).json({ message: resultado.message });
  res.status(200).json({ posto: resultado.posto });
});

//APP MOBILE
app.get("/postos/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const posto = await db.selectPostosId(id);

    if (!posto) {
      return res.status(404).json({ message: "Posto não encontrado" });
    }

    res.json(posto);
  } catch (error) {
    console.error("Erro no GET /postos/:id", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const resultado = await db.loginPaciente(email, senha);
  if (!resultado.success)
    return res.status(401).json({ message: resultado.message });
  res.status(200).json({ paciente: resultado.paciente });
});

app.post("/cadastro", async (req, res) => {
  const paciente = req.body;
  const results = await db.cadastroPaciente(paciente);
  if (!results.success)
    return res.status(400).json({ message: results.message });
  res.status(201).json({ message: "Cadastrado com sucesso." });
});

app.get("/", async (req, res) => {
  const results = await db.selectPostos();
  res.json(results);
});

app.listen(process.env.PORT, "192.168.0.40", () => {
  console.log("App is running!");
});
