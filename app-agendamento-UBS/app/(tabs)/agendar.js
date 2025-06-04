import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";
import { useRouter } from "expo-router";
import ListaPostos from "../shared/components/ListaPostos";

export default function Agendar() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.text}>Selecione um posto de saude:</Text>
      <ListaPostos onPressPosto={(id) => router.push(`../posto/${id}`)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
    padding: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
  },
});
