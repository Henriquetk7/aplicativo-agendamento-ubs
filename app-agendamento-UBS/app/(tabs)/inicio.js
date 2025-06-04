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
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import ListaPostos from "../shared/components/ListaPostos.js";
import { usePacienteStore } from "../../store/usePacienteStore.js";
import { usePaciente } from "../../hooks/usePaciente.js";

export default function Inicio() {
  const router = useRouter();
  const paciente = usePaciente();
  const nomePaciente = paciente?.nome?.split(" ").slice(0, 2).join(" ") || "";

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
          <View style={styles.containerSection}>
            <TouchableOpacity
              style={styles.seusAgendamentos}
              onPress={() => {
                if (paciente?.id) {
                  router.push({
                    pathname: "../screens/meusAgendamentos/meusAgendamentos",
                    params: { id_paciente: paciente.id },
                  });
                } else {
                  Alert.alert("Erro", "Paciente não encontrado.");
                }
              }}
            >
              <Text style={styles.textMeusAgendamentos}>Meus agendamentos</Text>
              <Image
                style={styles.iconSeusAgendamentos}
                source={require("../../assets/ep_arrow-right.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.containerSection}>
            <View style={styles.section}>
              <Text style={styles.titleSection}>Postos de saúde próximos</Text>
              <Text style={styles.descriptionSection}>
                Selecione um para realizar o agendamento
              </Text>
            </View>
            <ListaPostos onPressPosto={(id) => router.push(`../posto/${id}`)} />
          </View>
          <View style={[styles.containerSection, styles.sectionFaq]}>
            <Text style={[styles.titleSection, styles.titleFaq]}>
              O que você está procurando?
            </Text>
            <TouchableOpacity
              style={styles.containerCardFaq}
              onPress={() => router.push("../screens/ajuda/item0")}
            >
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
            <TouchableOpacity
              style={styles.containerCardFaq}
              onPress={() => router.push("../screens/ajuda/item1")}
            >
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
            <TouchableOpacity
              style={styles.containerCardFaq}
              onPress={() => router.push("../screens/ajuda/item2")}
            >
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
            <TouchableOpacity
              style={styles.containerCardFaq}
              onPress={() => router.push("../screens/ajuda/item3")}
            >
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
    paddingHorizontal: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  containerSection: {
    marginTop: 32,
    gap: 16,
  },

  seusAgendamentos: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },

  textMeusAgendamentos: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#016DFF",
    width: "90%",
  },

  iconSeusAgendamentos: {
    width: 16,
    height: 16,
  },

  section: {
    gap: 4,
  },

  titleSection: {
    fontSize: 16,
  },
  descriptionSection: {
    fontSize: 10,
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
