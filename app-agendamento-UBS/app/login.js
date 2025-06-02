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
  ScrollView,
  Platform,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.85.166:3000/login", {
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
        await AsyncStorage.setItem("paciente", JSON.stringify(data.paciente));

        router.replace("/(tabs)/inicio");
      } else {
        Alert.alert("Erro", data.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  };

  const [mostrarSenha, setMostrarSenha] = useState(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <Image style={styles.img} source={require("../assets/logo-1.png")} />
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
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

          <TouchableOpacity style={styles.btn} onPress={handleLogin}>
            <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.replace("/cadastro")}>
            <Text style={styles.linkCadastro}>
              Ainda não tem conta? Cadastrar-se
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace("/loginPosto")}>
            <Text style={styles.linkCadastro}>Login posto</Text>
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
    borderRadius: 16,
  },

  icon: {
    width: 20,
    height: 20,
  },

  mostrarSenha: {
    position: "relative",
    top: -44,
    left: "92%",
  },
  btn: {
    width: "100%",
    height: 48,
    backgroundColor: "#016DFF",
    justifyContent: "center",
    borderRadius: 50,
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
