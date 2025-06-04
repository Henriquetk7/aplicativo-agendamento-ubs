import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AjudaComponent from "../../shared/components/AjudaComponent";

export default function Ajuda() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <AjudaComponent
          title="Quais tipos de atendimento estão disponíveis?"
          content="Atualmente, os atendimentos disponíveis incluem:
• Consultas médicas
• Odontologia
• Enfermagem (curativos, pressão, glicemia)
• Vacinação
• Pré-natal
• Entrega de medicamentos
A disponibilidade pode variar de acordo com o posto de saúde. Verifique os horários e serviços na aba Início ou entre em contato com a unidade desejada."
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 16,
  },
});
