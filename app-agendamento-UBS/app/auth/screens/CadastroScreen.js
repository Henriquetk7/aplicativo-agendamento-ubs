import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { TextInputMask } from "react-native-masked-text";
import ButtonComponent from "../../shared/components/ButtonComponent";

export default function CadastroScreen() {
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

    const cpfLimpo = cpf.replace(/\D/g, "");
    const telefoneLimpo = telefone.replace(/\D/g, "");
    const susLimpo = num_sus.replace(/\D/g, "");

    if (cpfLimpo.length !== 11) {
      Alert.alert("Erro", "CPF inválido.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailValido) {
      Alert.alert("Erro", "E-mail inválido.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
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
          cpf: cpfLimpo,
          telefone: telefoneLimpo,
          num_sus: susLimpo,
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
          <Image
            style={styles.img}
            source={require("../../../assets/logo-1.png")}
          />
          <Text style={styles.title}>Cadastre-se</Text>

          <View>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
            />
          </View>

          <View>
            <Text style={styles.label}>CPF</Text>
            <TextInputMask
              type={"cpf"}
              value={cpf}
              onChangeText={setCpf}
              style={styles.input}
              keyboardType="numeric"
              placeholder="000.000.000-00"
            />
          </View>

          <View>
            <Text style={styles.label}>Telefone</Text>
            <TextInputMask
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              value={telefone}
              onChangeText={setTelefone}
              style={styles.input}
              keyboardType="numeric"
              placeholder="(68) 99999-9999"
            />
          </View>

          <View>
            <Text style={styles.label}>Cartão do SUS</Text>
            <TextInputMask
              type={"custom"}
              options={{ mask: "999 9999 9999 9999" }}
              style={styles.input}
              value={num_sus}
              onChangeText={setNumSus}
              placeholder="000 0000 0000 0000"
              keyboardType="numeric"
            />
          </View>

          <View>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="exemplo@email.com"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View>
            <Text style={styles.label}>Senha</Text>
            <View style={[styles.inputSenha, styles.input]}>
              <TextInput
                placeholder="*******"
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
                      ? require("../../../assets/view.png")
                      : require("../../../assets/view-off.png")
                  }
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.auxText}>
              A senha deve conter no mínimo 6 caracteres.
            </Text>
          </View>

          <ButtonComponent onPress={handleCadastro} title="Cadastrar-se" />

          <TouchableOpacity
            onPress={() => router.replace("../screens/LoginScreen")}
          >
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
    marginBottom: 16,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 10,
    color: "#808080",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    height: 48,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  inputSenha: {
    flexDirection: "row",
    alignItems: "center",
  },
  mostrarSenha: {
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  auxText: {
    fontSize: 10,
    color: "#808080",
    marginBottom: 24,
  },
  linkLogin: {
    color: "#808080",
    textAlign: "center",
    marginTop: 16,
    fontSize: 12,
  },
});
