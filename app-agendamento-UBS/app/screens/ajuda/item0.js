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
          title="Como faço para agendar uma consulta?"
          content="Para agendar uma consulta, vá até a aba 'Início', selecione o posto de saúde desejado e toque no botão 'Iniciar Agendamento'. Depois, escolha o tipo de atendimento, a data e o horário disponíveis. Ao finalizar, confirme os dados e pronto! Seu agendamento será salvo automaticamente."
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
