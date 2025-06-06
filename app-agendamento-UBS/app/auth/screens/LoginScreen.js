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
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import useAuthStore from "../../../store/auth";
import ButtonComponent from "../../shared/components/ButtonComponent";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const login = useAuthStore((state) => state.login);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    const result = await login(email, senha);

    if (result.sucesso) {
      router.replace("../../(tabs)/inicio");
    } else {
      Alert.alert("Erro", result.mensagem);
    }
  };

  const [mostrarSenha, setMostrarSenha] = useState(false);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <StatusBar style="auto" />
            <Image
              style={styles.img}
              source={require("../../assets/logo-1.png")}
            />
            <Text style={styles.title}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
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
                    ? require("../../assets/view.png")
                    : require("../../assets/view-off.png")
                }
              />
            </TouchableOpacity>

            <ButtonComponent onPress={handleLogin} title="Entrar" />

            <TouchableOpacity
              onPress={() => router.replace("../screens/CadastroScreen")}
            >
              <Text style={styles.linkCadastro}>
                Ainda não tem conta? Cadastrar-se
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F1F2",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
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
  linkCadastro: {
    color: "#808080",
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
  },
});
