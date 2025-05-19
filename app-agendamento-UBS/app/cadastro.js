import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Cadastro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [num_sus, setNumSus] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async () => {
    try {
      const response = await fetch(
        "http://192.168.0.72:3000/pacientes/cadastro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            cpf,
            telefone,
            num_sus,
            email,
            senha,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", data.message);
      } else {
        Alert.alert("Erro", data.message || "Erro ao cadastrar paciente");
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image style={styles.img} source={require("../assets/logo-1.png")} />
      <Text style={styles.title}>Cadastra-se</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
      />
      <TextInput
        style={styles.input}
        placeholder="Número do SUS"
        value={num_sus}
        onChangeText={setNumSus}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
        <Text style={styles.btnText}>Cadastrar-se</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/login")}>
        <Text style={styles.linkLogin}>Já possui conta? Faça login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F1F2",
    justifyContent: "center",
    padding: 20,
  },
  img: {
    width: 58,
    height: 58,
    marginBottom: 32,
  },

  title: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    backgroundColor: "#fff",
    width: "100%",
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  btn: {
    width: "100%",
    height: 48,
    backgroundColor: "#016DFF",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 32,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },

  linkLogin: {
    color: "#808080",
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
  },
});
