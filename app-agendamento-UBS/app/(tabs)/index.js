import { useEffect, useState } from "react";
import { Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import useAuthStore from "../../store/auth";

export default function Index() {
  const { paciente, setPaciente } = useAuthStore();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const pacienteSalvo = await AsyncStorage.getItem("paciente");
        if (pacienteSalvo) {
          const pacienteObj = JSON.parse(pacienteSalvo);
          setPaciente(pacienteObj);
        }
      } catch (error) {
        console.error("Erro ao carregar paciente do AsyncStorage:", error);
      } finally {
        setCarregando(false);
      }
    };

    verificarLogin();
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#016DFF" />
      </View>
    );
  }

  return <Redirect href={paciente ? "/inicio" : "/auth/screens/LoginScreen"} />;
}
export const options = {
  href: null,
};
