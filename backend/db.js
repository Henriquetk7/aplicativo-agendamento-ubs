const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const client = mysql.createPool(process.env.CONNECTION_STRING);

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
      message: "Login bem-sucedido.",
      paciente: {
        id: paciente.id_paciente,
        nome: paciente.nome,
        email: paciente.email,
      },
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Erro no login." };
  }
}
async function loginPosto(email, senha) {
  try {
    const [rows] = await client.query(
      "SELECT * FROM postos_saude WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length === 0) {
      return { success: false, message: "Posto de saúde não encontrado." };
    }

    const posto = rows[0];
    return {
      success: true,
      message: "Login bem-sucedido.",
      posto: {
        id: posto.id_posto_saude,
        nome: posto.nome,
        email: posto.email,
      },
    };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { success: false, message: "Erro no login." };
  }
}

async function selectPostos() {
  const [rows] = await client.query(`SELECT nome FROM postos_saude;`);
  return rows;
}

async function selectPostosId(id) {
  const [rows] = await client.query(
    `SELECT nome, endereco FROM postos_saude WHERE id_posto_saude = ?`,
    [id]
  );
  return rows[0];
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
    agendamentos ca ON ap.id_agendamento = a.id_agendamento
    JOIN 
    pacientes p ON ap.id_paciente = p.id_paciente
    WHERE 
    p.id_paciente = ?;`
  );
  return rows[0];
}

module.exports = {
  cadastroPaciente,
  loginPaciente,
  loginPosto,
  selectPostos,
  selectPostosId,
  pacientesDoDia,
};
