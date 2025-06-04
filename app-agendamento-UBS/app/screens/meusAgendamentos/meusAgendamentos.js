import { cloneElement, useEffect, useState } from "react";
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

export default function MeusAgendamentos() {
  const router = useRouter();
  const largura = Dimensions.get("window").width;
  const { paciente, setPaciente } = useAuthStore(); // <- precisa exportar isso na store
  const id_paciente = paciente?.id;
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const buscarPaciente = async () => {
      if (!paciente) {
        const pacienteJson = await AsyncStorage.getItem("paciente");
        if (pacienteJson) {
          const dados = JSON.parse(pacienteJson);
          setPaciente(dados);
        }
      }
    };

    buscarPaciente();
  }, []);

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
            `http://192.168.85.166:3000/meusAgendamentos/${id_paciente}`
          );
          const data = await response.json();
          setAgendamentos(data);
        } catch (err) {
          console.error("Erro ao buscar agendamentos:", err);
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Image
              style={styles.goBackIcon}
              source={require("../../../assets/arrow-right.png")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Meus agendamentos</Text>
          <View style={styles.side}></View>
        </View>
        <View style={styles.container}>
          <FlatList
            data={agendamentos}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[styles.containerCard, { width: largura - 32 }]}>
                <View style={styles.card}>
                  <Text style={styles.dataHora}>
                    {formatarDataHora(item.data_hora)}
                  </Text>
                  <View>
                    <Text style={styles.posto}>{item.posto_saude}</Text>
                    <Text style={styles.tipoAtendimento}>
                      {item.tipo_atendimento}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
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

  containerCard: {
    borderRadius: 16,
    backgroundColor: "#fff",
    padding: 16,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dataHora: {
    width: 144,
    fontSize: 16,
    fontWeight: "bold",
    color: "#016DFF",
  },

  posto: {
    fontSize: 14,
    textAlign: "right",
  },

  tipoAtendimento: {
    fontSize: 12,
    color: "#808080",
    textAlign: "right",
  },
});
