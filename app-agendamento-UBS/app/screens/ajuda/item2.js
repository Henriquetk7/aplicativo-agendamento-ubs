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
          content="Sim. Para ser atendido, é importante levar:
• Documento com foto: pode ser RG, CNH ou outro oficial com foto.
• Cartão do SUS: essencial para identificar seu cadastro no sistema de saúde.
• Comprovante de agendamento (se tiver): ajuda a agilizar seu atendimento.
• Receitas, exames ou laudos anteriores (em caso de retorno): isso facilita o acompanhamento do seu histórico.
• Cartão de pré-natal (para gestantes).
• Documento do responsável (se for menor de idade ou acompanhante legal).
Levar os documentos certos evita atrasos ou remarcações."
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
