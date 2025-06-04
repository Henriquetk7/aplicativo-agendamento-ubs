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
          content="Em casos de emergência ou risco de vida, não aguarde agendamento.
Procure imediatamente a UPA mais próxima ou vá direto ao Pronto-Socorro da sua cidade.
Se necessário, ligue para:
📞 SAMU – 192 (atendimento de urgência 24h)
Postos de saúde atendem apenas casos leves e agendamentos comuns."
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
