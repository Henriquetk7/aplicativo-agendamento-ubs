import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
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
    <SafeAreaView style={styles.page}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerContainer}>
            <Image
              style={styles.icon}
              source={require("../../assets/logo-1.png")}
            />
            <Text style={styles.userName}>Olá, {nomePaciente}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.titleSection}>Seus agendamentos</Text>
            <Text style={styles.descriptionSection}>
              Você ainda não possui agendamentos
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.titleSection}>Postos de saúde próximos</Text>
            <ListaPostos onPressPosto={(id) => router.push(`../posto/${id}`)} />
          </View>
          <View style={[styles.section, styles.sectionFaq]}>
            <Text style={[styles.titleSection, styles.titleFaq]}>
              O que está procurando?
            </Text>
            <TouchableOpacity style={styles.containerCardFaq}>
              <View style={styles.cardFaq}>
                <Image
                  style={styles.iconFaq}
                  source={require("../../assets/faq-icon.png")}
                />
                <Text style={styles.cardFaqText}>
                  Como faço para agendar uma consulta?
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerCardFaq}>
              <View style={styles.cardFaq}>
                <Image
                  style={styles.iconFaq}
                  source={require("../../assets/faq-icon.png")}
                />
                <Text style={styles.cardFaqText}>
                  Quais tipos de atendimento estão disponíveis?
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerCardFaq}>
              <View style={styles.cardFaq}>
                <Image
                  style={styles.iconFaq}
                  source={require("../../assets/faq-icon.png")}
                />
                <Text style={styles.cardFaqText}>
                  Preciso levar algum documento no dia da consulta?
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerCardFaq}>
              <View style={styles.cardFaq}>
                <Image
                  style={styles.iconFaq}
                  source={require("../../assets/faq-icon.png")}
                />
                <Text style={styles.cardFaqText}>
                  O que fazer em casos de emergência?
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  header: {
    backgroundColor: "#fff",
    height: 180,
    paddingTop: 64,
    paddingHorizontal: 16,
    paddingBottom: 16,
    width: "100%",
    justifyContent: "center",
    borderBottomWidth: 8,
    borderBottomColor: "#CFE3FF",
  },
  headerContainer: {
    gap: 24,
    justifyContent: "center",
  },
  container: {
    padding: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
  userName: {
    fontSize: 16,
  },
  section: {
    marginBottom: 32,
    gap: 16,
  },
  titleSection: {
    fontSize: 16,
  },
  descriptionSection: {
    fontSize: 12,
    color: "#808080",
  },

  sectionFaq: {
    marginBottom: 128,
    gap: 8,
  },
  titleFaq: {
    marginBottom: 16,
  },

  containerCardFaq: {
    backgroundColor: "#fff",
    padding: 16,
    height: 72,
    borderRadius: 16,
    justifyContent: "center",
    gap: 16,
  },

  cardFaq: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    width: "90%",
  },

  iconFaq: {
    width: 24,
    height: 24,
  },

  cardFaqText: {
    fontSize: 12,
  },
});
