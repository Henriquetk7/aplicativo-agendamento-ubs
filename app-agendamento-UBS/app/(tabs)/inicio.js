import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import ListaPostos from "../../components/ListaPostos";

export default function Inicio() {
  const router = useRouter();
  const [nomePaciente, setNomePaciente] = useState("");

  useEffect(() => {
    const buscarPaciente = async () => {
      const pacienteJson = await AsyncStorage.getItem("paciente");
      if (pacienteJson) {
        const paciente = JSON.parse(pacienteJson);
        const nomes = paciente.nome.split(" ");
        const primeirosDois = nomes.slice(0, 2).join(" ");
        setNomePaciente(primeirosDois);
      }
    };

    buscarPaciente();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>Olá, {nomePaciente}</Text>
      <View style={styles.section}>
        <Text style={styles.titleSection}>Seus agendamentos</Text>
        <Text style={styles.descriptionSection}>
          Você ainda não possui agendamentos
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.titleSection}>Postos de saúde próximos</Text>
        <ListaPostos />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    padding: 16,
  },
  userName: {
    fontSize: 20,
  },
  section: {
    gap: 12,
    marginTop: 48,
  },
  titleSection: {
    fontSize: 16,
  },
  descriptionSection: {
    fontSize: 12,
    color: "#808080",
  },
});
