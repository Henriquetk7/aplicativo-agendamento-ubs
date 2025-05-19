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

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.0.72:3000/pacientes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", data.message);
      } else {
        Alert.alert("Erro", data.message || "Erro ao fazer login");
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
      <Text style={styles.title}>Login</Text>
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
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace("/cadastro")}>
        <Text style={styles.linkCadastro}>
          Ainda não tem conta? Cadastre-se
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F1F2",
    padding: 16,
    justifyContent: "center",
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

  linkCadastro: {
    color: "#808080",
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
  },
});
