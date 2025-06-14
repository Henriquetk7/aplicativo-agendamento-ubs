require("dotenv").config();

const express = require("express");
const db = require("./db");

const app = express();

// =======================
// APP MOBILE - ROTAS
// =======================

app.get("/meusAgendamentos/:id_paciente", async (req, res) => {
  const id_paciente = parseInt(req.params.id_paciente);
  if (isNaN(id_paciente)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const agendamentos = await db.getAgendamentoPaciente(id_paciente);

    if (!agendamentos || agendamentos.length === 0) {
      return res.status(404).json({ message: "Nenhum agendamento encontrado" });
    }

    res.json(agendamentos);
  } catch (error) {
    console.error("Erro ao buscar agendamentos:", error);
    res.status(500).json({ message: "Erro interno ao buscar agendamentos." });
  }
});

app.post("/agendar", async (req, res) => {
  try {
    const { id_agendamento, id_paciente } = req.body;

    if (!id_agendamento || !id_paciente) {
      return res.status(400).json({ message: "Dados incompletos" });
    }

    const resultado = await db.insertAgendamentoPaciente({
      id_agendamento,
      id_paciente,
    });

    res.status(resultado.success ? 200 : 500).json(resultado);
  } catch (error) {
    console.error("Erro no POST /agendar", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

app.get(
  "/horariosAgendamentoComFichas/:id_posto_saude/:id_tipo_atendimento",
  async (req, res) => {
    const id_posto_saude = parseInt(req.params.id_posto_saude);
    const id_tipo_atendimento = parseInt(req.params.id_tipo_atendimento);

    if (isNaN(id_posto_saude) || isNaN(id_tipo_atendimento)) {
      return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    try {
      const horarios = await db.getHorariosComFichas(
        id_posto_saude,
        id_tipo_atendimento
      );

      if (!horarios || horarios.length === 0) {
        return res.status(404).json({ message: "Nenhum horário disponível" });
      }

      res.json(horarios);
    } catch (error) {
      console.error("Erro ao buscar horários com fichas:", error);
      res.status(500).json({ message: "Erro interno ao buscar horários." });
    }
  }
);

app.get(
  "/horariosAgendamento/:id_posto_saude/:id_tipo_atendimento",
  async (req, res) => {
    try {
      const id_posto = parseInt(req.params.id_posto_saude);
      const id_tipo = parseInt(req.params.id_tipo_atendimento);

      if (isNaN(id_posto) || isNaN(id_tipo)) {
        return res.status(400).json({ message: "IDs inválidos" });
      }

      const horarios = await db.getDataHoraAgendamento(id_posto, id_tipo);

      if (!horarios || horarios.length === 0) {
        return res.status(404).json({ message: "Nenhum horário disponível" });
      }

      res.json(horarios);
    } catch (error) {
      console.error(
        "Erro no GET /horariosAgendamento/:id_posto_saude/:id_tipo_atendimento",
        error
      );
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

app.get("/tiposAtendimento/:id_posto_saude", async (req, res) => {
  try {
    const id = parseInt(req.params.id_posto_saude);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const tipos = await db.getTiposAtendimentosAgendamento(id);

    if (!tipos || tipos.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum tipo de atendimento encontrado" });
    }

    res.json(tipos);
  } catch (error) {
    console.error("Erro no GET /tiposAtendimento/:id_posto_saude", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

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

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const resultado = await db.loginPaciente(email, senha);
  if (!resultado.success)
    return res.status(401).json({ message: resultado.message });

  return res.json(resultado.paciente);
});

app.post("/cadastro", async (req, res) => {
  const paciente = req.body;
  const results = await db.cadastroPaciente(paciente);
  if (!results.success)
    return res.status(400).json({ message: results.message });

  res.status(201).json({ message: "Cadastrado com sucesso." });
});

app.get("/postos", async (req, res) => {
  const results = await db.getPostos();
  res.json(results);
});

app.get("/", (req, res) => {
  res.send("API rodando com sucesso");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App is running!");
});
