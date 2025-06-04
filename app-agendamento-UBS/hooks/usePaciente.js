import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePacienteStore } from "../store/usePacienteStore";

export function usePaciente() {
  const { paciente, setPaciente } = usePacienteStore();

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
