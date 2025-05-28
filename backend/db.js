const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = mysql.createPool(process.env.CONNECTION_STRING);

const SECRET = process.env.JWT_SECRET;

// ==========================
// WEB ADMIN
// ==========================
async function loginPosto(email, senha) {
  try {
    const [rows] = await client.query(
      "SELECT * FROM postos_saude WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return { success: false, message: "Posto de saúde não encontrado." };
    }

    const posto = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, posto.senha);

    if (!senhaCorreta) {
      return { success: false, message: "Senha incorreta." };
    }

    const token = jwt.sign(
      {
        id_posto_saude: posto.id_posto_saude,
        email: posto.email,
      },
      SECRET,
      { expiresIn: "8h" }
    );

    return {
      success: true,
      posto: {
        id: posto.id_posto_saude,
        nome: posto.nome,
        email: posto.email,
      },
      token,
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Erro no login." };
  }
}

async function pacientesDoDia(id) {
  const [rows] = await client.query(
    `SELECT 
      p.nome AS nome_paciente,
      a.tipo_atendimento,
      a.data_agendamento,
      a.hora_agendamento
    FROM 
      agendamentos_pacientes ap
    JOIN 
      agendamentos a ON ap.id_agendamento = a.id_agendamento
    JOIN 
      pacientes p ON ap.id_paciente = p.id_paciente
    WHERE 
      p.id_paciente = ?;`,
    [id]
  );
  return rows[0];
}

async function criarAgendamento(agendamento) {
  const values = [
    agendamento.id_posto_saude,
    agendamento.id_tipo_atendimento,
    agendamento.data_hora_agendamento,
    agendamento.quantidade_fichas,
  ];

  try {
    await client.query(
      `INSERT INTO agendamentos (id_posto_saude, id_tipo_atendimento, data_hora_agendamento, quantidade_fichas) 
       VALUES (?, ?, ?, ?)`,
      values
    );

    return { success: true, message: "Agendamento criado com sucesso." };
  } catch (error) {
    console.error("Erro ao criar agendamento:", error);
    return { success: false, message: "Erro ao criar agendamento." };
  }
}

// ==========================
// APP MOBILE
// ==========================
async function cadastroPaciente(paciente) {
  const hashedPassword = await bcrypt.hash(paciente.senha, 10);
  const values = [
    paciente.nome,
    paciente.cpf,
    paciente.telefone,
    paciente.num_sus,
    paciente.email,
    hashedPassword,
  ];
  try {
    await client.query(
      `INSERT INTO pacientes (nome, cpf, telefone, num_sus, email, senha) VALUES (?, ?, ?, ?, ?, ?)`,
      values
    );

    return { success: true, message: "Paciente cadastrado com sucesso." };
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);
    return { success: false, message: "Erro ao cadastrar paciente." };
  }
}

async function loginPaciente(email, senha) {
  try {
    const [rows] = await client.query(
      "SELECT * FROM pacientes WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return { success: false, message: "Paciente não encontrado." };
    }

    const paciente = rows[0];

    const senhaCorreta = await bcrypt.compare(senha, paciente.senha);
    if (!senhaCorreta) {
      return { success: false, message: "Senha incorreta." };
    }

    const token = jwt.sign(
      {
        id_paciente: paciente.id_paciente,
        email: paciente.email,
      },
      SECRET,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      paciente: {
        id: paciente.id_paciente,
        nome: paciente.nome,
        email: paciente.email,
      },
      token,
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Erro no login." };
  }
}

async function getPostos() {
  const [rows] = await client.query(
    `SELECT id_posto_saude, nome FROM postos_saude;`
  );
  return rows;
}

async function getPostosId(id_posto_saude) {
  const [rows] = await client.query(
    `SELECT nome, endereco, horario_funcionamento, telefone FROM postos_saude WHERE id_posto_saude = ?`,
    [id_posto_saude]
  );
  return rows[0];
}

async function getTiposAtendimentoAgendamento(id_posto_saude) {
  try {
    const [rows] = await client.query(
      `SELECT DISTINCT ta.id_tipo_atendimento, ta.descricao
       FROM agendamentos a
       JOIN tipos_atendimento ta ON a.id_tipo_atendimento = ta.id_tipo_atendimento
       WHERE a.id_posto_saude = ?;`,
      [id_posto_saude]
    );
    return rows;
  } catch (error) {
    console.error("Erro ao selecionar tipos de atendimento:", error);
    return {
      success: false,
      message: "Erro ao selecionar tipos de atendimento.",
    };
  }
}

async function getDataHoraAgendamento(id_posto_saude, id_tipo_atendimento) {
  try {
    const [rows] = await client.query(
      `SELECT id_agendamento, data_hora_agendamento, quantidade_fichas
       FROM agendamentos
       WHERE id_posto_saude = ? AND id_tipo_atendimento = ?;`,
      [id_posto_saude, id_tipo_atendimento]
    );
    return rows;
  } catch (error) {
    console.error("Erro ao selecionar data e hora do agendamento:", error);
    return {
      success: false,
      message: "Erro ao selecionar data e hora.",
    };
  }
}

async function insertAgendamentoPaciente(data) {
  const values = [data.id_agendamento, data.id_paciente];
  try {
    await client.query(
      `INSERT INTO agendamentos_pacientes (id_agendamento, id_paciente) VALUES (?, ?)`,
      values
    );

    return { success: true, message: "Agendamento feito com sucesso!" };
  } catch (error) {
    console.error("Erro ao fazer agendamento:", error);
    return { success: false, message: "Erro ao fazer agendamento." };
  }
}

// ==========================
// EXPORT
// ==========================
module.exports = {
  loginPosto,
  pacientesDoDia,
  criarAgendamento,
  loginPaciente,
  cadastroPaciente,
  getPostos,
  getPostosId,
  getTiposAtendimentoAgendamento,
  getDataHoraAgendamento,
  insertAgendamentoPaciente,
};
