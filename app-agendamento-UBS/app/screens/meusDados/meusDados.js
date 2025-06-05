import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { usePaciente } from "../../../hooks/usePaciente";

export default function MeusDados() {
  const router = useRouter();
  const paciente = usePaciente();
  const formatarCPF = (cpf) => {
    if (!cpf) return "";
    const somenteNumeros = cpf.replace(/\D/g, "");
    return somenteNumeros.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
      "$1.$2.$3-$4"
    );
  };
  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    const somenteNumeros = telefone.replace(/\D/g, "");
    return somenteNumeros.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  };

  const formatarSUS = (numSus) => {
    if (!numSus) return "";
    const somenteNumeros = numSus.replace(/\D/g, "");
    return somenteNumeros.replace(/(\d{3})(?=\d)/g, "$1 ").trim();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={styles.goBackIcon}
              source={require("../../../assets/arrow-right.png")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Meus Dados</Text>
          <View style={styles.side}></View>
        </View>

        {paciente ? (
          <View style={styles.infoBox}>
            <View style={styles.item}>
              <Text style={styles.label}>Nome completo</Text>
              <Text style={styles.valor}>{paciente.nome}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>CPF</Text>
              <Text style={styles.valor}>{formatarCPF(paciente.cpf)}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Telefone</Text>
              <Text style={styles.valor}>
                {formatarTelefone(paciente.telefone)}
              </Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>Número do SUS</Text>
              <Text style={styles.valor}>{formatarSUS(paciente.num_sus)}</Text>
            </View>

            <View style={styles.item}>
              <Text style={styles.label}>E-mail</Text>
              <Text style={styles.valor}>{paciente.email}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.loading}>Carregando dados...</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 64,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  goBackIcon: {
    width: 40,
    height: 40,
    position: "relative",
    right: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  side: {
    width: 32,
  },
  infoBox: {
    gap: 16,
  },
  label: {
    fontSize: 12,
    color: "#808080",
    marginBottom: 4,
  },
  valor: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
  },
  loading: {
    marginTop: 32,
    textAlign: "center",
    color: "#666",
  },
});
