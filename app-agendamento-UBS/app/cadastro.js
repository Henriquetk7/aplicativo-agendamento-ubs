import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleCadastro = async () => {
    if (
      !nome.trim() ||
      !cpf.trim() ||
      !telefone.trim() ||
      !num_sus.trim() ||
      !email.trim() ||
      !senha.trim()
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await fetch("http://192.168.85.166:3000/cadastro", {
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
      });

      const data = await response.json();

      if (response.ok) {
        router.replace("/login");
      } else {
        Alert.alert("Erro", data.message || "Erro ao cadastrar paciente");
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Image style={styles.img} source={require("../assets/logo-1.png")} />
          <Text style={styles.title}>Cadastre-se</Text>
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
            keyboardType="numeric"
            maxLength={11}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="numeric"
            maxLength={11}
          />
          <TextInput
            style={styles.input}
            placeholder="Número do SUS"
            value={num_sus}
            onChangeText={setNumSus}
            keyboardType="numeric"
            maxLength={15}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.inputSenha}>
            <TextInput
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!mostrarSenha}
              style={{ flex: 1 }}
            />
            <TouchableOpacity
              style={styles.mostrarSenha}
              onPress={() => setMostrarSenha(!mostrarSenha)}
            >
              <Image
                style={styles.icon}
                source={
                  mostrarSenha
                    ? require("../assets/view.png")
                    : require("../assets/view-off.png")
                }
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleCadastro}>
            <Text style={styles.btnText}>Cadastrar-se</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/login")}>
            <Text style={styles.linkLogin}>Já possui conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
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
    backgroundColor: "#fff",
    width: "100%",
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
  },
  inputSenha: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  mostrarSenha: {
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
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
