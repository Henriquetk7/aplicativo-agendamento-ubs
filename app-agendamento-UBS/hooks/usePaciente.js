import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "../store/auth"; // ou "../store/usePacienteStore" se o nome for outro

export function usePaciente() {
  const { paciente, setPaciente } = useAuthStore();

  useEffect(() => {
    const carregarPaciente = async () => {
      if (!paciente) {
        const pacienteJson = await AsyncStorage.getItem("paciente");
        if (pacienteJson) {
          const dados = JSON.parse(pacienteJson);
          setPaciente(dados);
        }
      }
    };

    carregarPaciente();
  }, []);

  return paciente;
}
