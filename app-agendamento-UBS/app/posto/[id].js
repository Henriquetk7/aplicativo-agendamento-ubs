import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import ButtonComponent from "../shared/components/ButtonComponent";
import config from "../../config";

export default function DetalhesPosto() {
  const { id } = useLocalSearchParams();
  const [posto, setPosto] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    console.log("ID recebido:", id);

    fetch(`${config.BASE_URL}/detalhesPosto/${id}`)
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
              <Text style={styles.textInfo}>{posto.horario_funcionamento}</Text>
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
              <Text style={styles.textInfo}>{posto.telefone}</Text>
            </View>
          </View>
          <View style={styles.cardInfo}>
            <Image
              style={styles.icon}
              source={require("../../assets/email-icon.png")}
            />
            <View>
              <Text style={styles.text}>E-mail:</Text>
              <Text style={styles.textInfo}>{posto.email}</Text>
            </View>
          </View>
        </View>
      </View>
      <ButtonComponent
        onPress={() =>
          router.push({ pathname: "/posto/agendamento", params: { id: id } })
        }
        title="Iniciar agendamento"
      />
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
    width: 344,
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
