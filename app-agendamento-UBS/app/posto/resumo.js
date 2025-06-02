import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResumoAgendamento() {
  const { nome_posto, id_agendamento, descricao, data_hora } =
    useLocalSearchParams();
  const router = useRouter();

  const handleFinalizar = () => {
    Alert.alert(
      "Confirmar Agendamento",
      "Tem certeza que deseja finalizar esse agendamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar",
          style: "default",
          onPress: async () => {
            try {
              const pacienteJson = await AsyncStorage.getItem("paciente");
              if (!pacienteJson) {
                Alert.alert("Erro", "Paciente não encontrado.");
                return;
              }

              const paciente = JSON.parse(pacienteJson);

              const response = await fetch(
                "http://192.168.85.166:3000/agendar",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    id_agendamento: parseInt(id_agendamento),
                    id_paciente: paciente.id,
                  }),
                }
              );

              const data = await response.json();

              if (response.ok) {
                Alert.alert("Sucesso", "Agendamento realizado com sucesso!");
                router.replace("../(tabs)/inicio");
              } else {
                Alert.alert("Erro", data.message || "Erro ao agendar.");
              }
            } catch (error) {
              console.error("Erro no agendamento:", error);
              Alert.alert("Erro", "Erro interno ao agendar.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={styles.goBackIcon}
              source={require("../../assets/arrow-right.png")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Resumo do Agendamento</Text>
        </View>
        <View>
          <View style={styles.card}>
            <Image
              style={styles.icon}
              source={require("../../assets/hospital-icon.png")}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.item}>Posto de saúde:</Text>
              <Text style={styles.itemText}>{nome_posto}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              style={styles.icon}
              source={require("../../assets/list-icon.png")}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.item}>Tipo de Atendimento:</Text>
              <Text style={styles.itemText}>{descricao}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              style={styles.icon}
              source={require("../../assets/time-icon.png")}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.item}>Horário agendado:</Text>
              <Text style={styles.itemText}>
                {new Date(data_hora).toLocaleString("pt-BR")}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.btn} onPress={handleFinalizar}>
        <Text style={styles.btnText}>Finalizar Agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 64,
    paddingBottom: 48,
    justifyContent: "space-between",
  },

  goBackIcon: {
    width: 40,
    height: 40,
    position: "relative",
    right: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
  },

  card: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  cardInfo: {
    gap: 4,
  },

  icon: {
    width: 24,
    height: 24,
  },
  item: {
    fontSize: 16,
  },

  itemText: {
    fontSize: 14,
    color: "#808080",
  },
  btn: {
    marginTop: 24,
    backgroundColor: "#016DFF",
    padding: 16,
    borderRadius: 32,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
