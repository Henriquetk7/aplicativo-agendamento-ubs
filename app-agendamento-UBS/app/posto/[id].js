import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetalhesPosto() {
  const { id } = useLocalSearchParams();
  const [posto, setPosto] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    console.log("ID recebido:", id);

    fetch(`http://192.168.85.166:3000/detalhesPosto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Dados recebidos:", data);
        setPosto(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar posto:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#016DFF" />
      </View>
    );
  }

  if (!posto) {
    return (
      <View style={styles.container}>
        <Text>Posto não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            style={styles.goBackIcon}
            source={require("../../assets/arrow-right.png")}
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{posto.nome}</Text>

          <View style={styles.cardInfo}>
            <Image
              style={styles.icon}
              source={require("../../assets/clock-icon.png")}
            />
            <View>
              <Text style={styles.text}>Horário de funcionamento:</Text>
              <Text style={styles.textInfo}>88888</Text>
            </View>
          </View>
          <View style={styles.cardInfo}>
            <Image
              style={styles.icon}
              source={require("../../assets/local-icon-large.png")}
            />
            <View>
              <Text style={styles.text}>Endereço:</Text>
              <Text style={styles.textInfo}>{posto.endereco}</Text>
            </View>
          </View>
          <View style={styles.cardInfo}>
            <Image
              style={styles.icon}
              source={require("../../assets/phone-icon.png")}
            />
            <View>
              <Text style={styles.text}>Telefone:</Text>
              <Text style={styles.textInfo}>5456456456</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/agendamento")}
      >
        <Text style={styles.btnText}>Iniciar agendamento</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 48,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  header: {
    gap: 16,
  },
  goBackIcon: {
    width: 40,
    height: 40,
    position: "relative",
    right: 6,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  icon: {
    width: 24,
    height: 24,
    position: "relative",
    bottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
  },
  textInfo: {
    fontSize: 14,
    color: "#808080",
    marginBottom: 16,
  },
  btn: {
    width: "100%",
    padding: 16,
    backgroundColor: "#016DFF",
    alignItems: "center",
    borderRadius: 32,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
