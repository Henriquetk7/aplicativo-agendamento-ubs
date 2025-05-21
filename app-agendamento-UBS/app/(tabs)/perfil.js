import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function Perfil() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente sair da conta?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sair",
        style: "destructive",
        onPress: () => {
          // Aqui você pode limpar dados salvos (ex: AsyncStorage)
          router.replace("../login");
        },
      },
    ]);
  };
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TouchableOpacity onPress={handleLogout}>
        <Text style={{ color: "red" }}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F1F2",
    padding: 16,
    justifyContent: "center",
  },
});
