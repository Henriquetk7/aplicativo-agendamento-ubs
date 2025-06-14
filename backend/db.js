const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

let client;

(async () => {
  try {
    client = await mysql.createConnection(process.env.DATABASE_URL);
    console.log("Conexão com banco feita com sucesso.");
  } catch (err) {
    console.error("Erro ao conectar no banco:", err);
  }
})();

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

    return {
      success: true,
      paciente: {
        id: paciente.id_paciente,
        nome: paciente.nome,
        cpf: paciente.cpf,
        telefone: paciente.telefone,
        num_sus: paciente.num_sus,
        email: paciente.email,
      },
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Erro no login." };
  }
}

async function getPostos() {
  const [rows] = await client.query(
    `SELECT id_posto_saude, nome, endereco FROM postos_saude;`
  );
  return rows;
}

async function getPostosId(id_posto_saude) {
  const [rows] = await client.query(
    `SELECT nome, endereco, horario_funcionamento, telefone, email FROM postos_saude WHERE id_posto_saude = ?`,
    [id_posto_saude]
  );
  return rows[0];
}

async function getTiposAtendimentosAgendamento(id_posto_saude) {
  try {
    const [rows] = await client.query(
      `SELECT DISTINCT ta.id_tipo_atendimento, ta.descricao
       FROM agendamentos a
       JOIN tipos_atendimento ta ON a.id_tipo_atendimento = ta.id_tipo_atendimento
       WHERE a.id_posto_saude = ?
       ORDER BY ta.descricao ASC;`,
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
    const [verifica] = await client.query(
      `SELECT * FROM agendamentos_pacientes WHERE id_agendamento = ? AND id_paciente = ?`,
      values
    );

    if (verifica.length > 0) {
      return { success: false, message: "Você já agendou esse horário." };
    }

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

async function getHorariosComFichas(id_posto_saude, id_tipo_atendimento) {
  try {
    const [rows] = await client.query(
      `
      SELECT 
        a.id_agendamento,
        a.data_hora_agendamento,
        a.quantidade_fichas,
        (
          SELECT COUNT(*) 
          FROM agendamentos_pacientes ap 
          WHERE ap.id_agendamento = a.id_agendamento
        ) AS fichas_usadas
      FROM agendamentos a
      WHERE a.id_posto_saude = ? AND a.id_tipo_atendimento = ?
      `,
      [id_posto_saude, id_tipo_atendimento]
    );

    return rows;
  } catch (error) {
    console.error("Erro no getHorariosComFichas:", error);
    return [];
  }
}

async function getAgendamentoPaciente(id_paciente) {
  const [rows] = await client.query(
    `SELECT
  a.data_hora_agendamento AS data_hora,
  ta.descricao AS tipo_atendimento,
  ps.nome AS posto_saude
FROM agendamentos_pacientes ap
JOIN agendamentos a ON ap.id_agendamento = a.id_agendamento
JOIN tipos_atendimento ta ON a.id_tipo_atendimento = ta.id_tipo_atendimento
JOIN postos_saude ps ON a.id_posto_saude = ps.id_posto_saude
WHERE ap.id_paciente = ?
ORDER BY a.data_hora_agendamento ASC;`,
    [id_paciente]
  );
  return rows;
}

// ==========================
// EXPORT
// ==========================
module.exports = {
  loginPaciente,
  cadastroPaciente,
  getPostos,
  getPostosId,
  getTiposAtendimentosAgendamento,
  getDataHoraAgendamento,
  insertAgendamentoPaciente,
  getHorariosComFichas,
  getAgendamentoPaciente,
};
