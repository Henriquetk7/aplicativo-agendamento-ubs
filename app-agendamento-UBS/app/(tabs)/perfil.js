import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import useAuthStore from "../../store/auth";

export default function Perfil() {
  const router = useRouter();
  const [nomePaciente, setNomePaciente] = useState("");

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da conta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("../auth/screens/LoginScreen");
        },
      },
    ]);
  };

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
      <StatusBar style="auto" />
      <View style={styles.header}>
        <View style={styles.user}>
          <Image
            style={styles.iconUser}
            source={require("../assets/person-icon.png")}
          />
        </View>
        <Text style={styles.userName}>{nomePaciente}</Text>
      </View>

      <View style={styles.containerCard}>
        <TouchableOpacity
          style={styles.cardBtn}
          onPress={() => router.push("../../screens/meusDados/meusDados")}
        >
          <View style={styles.cardSection}>
            <View style={styles.card}>
              <Image
                style={styles.cardIcon}
                source={require("../assets/icon-person-data.png")}
              />

              <View>
                <Text style={styles.cardText}>Meus dados</Text>
                <Text style={styles.cardDescription}>
                  Visualize suas informações
                </Text>
              </View>
            </View>
            <Image
              style={styles.iconAux}
              source={require("../assets/ep_arrow-right-perfil.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardBtn}
          onPress={() =>
            router.push("../screens/meusAgendamentos/meusAgendamentos")
          }
        >
          <View style={styles.cardSection}>
            <View style={styles.card}>
              <Image
                style={styles.cardIcon}
                source={require("../assets/icon-schedule.png")}
              />

              <View>
                <Text style={styles.cardText}>Meus agendamentos</Text>
                <Text style={styles.cardDescription}>
                  Visualize os agendamentos realizados
                </Text>
              </View>
            </View>
            <Image
              style={styles.iconAux}
              source={require("../assets/ep_arrow-right-perfil.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardBtn}>
          <View style={styles.cardSection}>
            <View style={styles.card}>
              <Image
                style={styles.cardIcon}
                source={require("../assets/icon-terms.png")}
              />

              <View>
                <Text style={styles.cardText}>Termos de uso</Text>
                <Text style={styles.cardDescription}>
                  Acesse os Termos de uso
                </Text>
              </View>
            </View>
            <Image
              style={[styles.iconAux, styles.iconExport]}
              source={require("../assets/icon-export.png")}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardBtn} onPress={handleLogout}>
          <View style={styles.cardSection}>
            <View style={styles.card}>
              <Image
                style={[styles.cardIcon, styles.iconLogout]}
                source={require("../assets/icon-logout.png")}
              />

              <View>
                <Text style={[styles.cardText, styles.logout]}>
                  Sair da conta
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F1F2",
    padding: 16,
  },

  header: {
    gap: 16,
    marginTop: 64,
  },

  user: {
    backgroundColor: "#CFE3FF",
    width: 72,
    height: 72,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  iconUser: {
    width: 24,
    height: 24,
  },

  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  containerCard: {
    marginTop: 32,
    gap: 16,
  },

  cardBtn: {
    flexDirection: "row",
    paddingVertical: 8,
  },
  cardSection: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  cardIcon: {
    width: 24,
    height: 24,
  },

  cardText: {
    fontSize: 16,
  },

  cardDescription: {
    fontSize: 12,
    color: "#808080",
  },

  iconAux: {
    width: 16,
    height: 16,
  },
  iconExport: {
    width: 24,
    height: 20,
  },

  logout: {
    color: "#FF5031",
  },

  iconLogout: {
    position: "relative",
    left: 3,
  },
});
