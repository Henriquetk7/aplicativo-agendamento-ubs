import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "../../../store/auth";
import config from "../../../config";

export default function MeusAgendamentos() {
  const router = useRouter();
  const largura = Dimensions.get("window").width;
  const { paciente, setPaciente } = useAuthStore();
  const id_paciente = paciente?.id;
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const carregar = async () => {
      if (!paciente) {
        const pacienteJson = await AsyncStorage.getItem("paciente");
        if (pacienteJson) {
          const dados = JSON.parse(pacienteJson);
          setPaciente(dados);
        }
      }

      if (id_paciente) {
        try {
          const response = await fetch(
            `${config.BASE_URL}/meusAgendamentos/${id_paciente}`
          );
          const data = await response.json();
          setAgendamentos(data);
        } catch (error) {
          console.error("Erro ao buscar agendamentos:", error);
        }
      }
    };
    carregar();
  }, [id_paciente]);

  const formatarDataHora = (dataHora) => {
    const data = new Date(dataHora);
    return data.toLocaleString("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={styles.goBackIcon}
            source={require("../../assets/arrow-right.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Meus agendamentos</Text>
        <View style={styles.side}></View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={agendamentos}
          keyExtractor={(item, index) => index.toString()}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.containerListEmpyt}>
              <Image
                style={styles.imgListEmpyt}
                source={require("../../assets/empyt-list.png")}
              />
              <Text style={styles.semAgendamento}>
                Você ainda não possui nenhum agendamento.
              </Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={[styles.containerCard, { width: largura - 32 }]}>
              <View style={styles.card}>
                <Text style={styles.dataHora}>
                  {formatarDataHora(item.data_hora)}
                </Text>
                <View style={styles.postoTipoAt}>
                  <Text style={styles.posto}>
                    {item.posto_saude.length < 20
                      ? item.posto_saude
                      : item.posto_saude.substring(0, 20) + "..."}
                  </Text>
                  <Text style={styles.tipoAtendimento}>
                    {item.tipo_atendimento}
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 64,
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
    width: 40,
  },

  container: {
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 32,
  },

  semAgendamento: {
    width: 256,
    textAlign: "center",
    color: "#808080",
  },

  containerListEmpyt: {
    alignItems: "center",
    gap: 16,
  },

  imgListEmpyt: {
    textAlign: "center",
  },

  containerCard: {
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dataHora: {
    maxWidth: 124,
    fontSize: 16,
    fontWeight: "bold",
    color: "#016DFF",
  },

  postoTipoAt: {
    maxWidth: 200,
  },

  posto: {
    fontSize: 12,
    textAlign: "right",
  },

  tipoAtendimento: {
    fontSize: 12,
    color: "#808080",
    textAlign: "right",
  },
});
