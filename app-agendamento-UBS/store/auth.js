import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  paciente: null,
  setPaciente: (paciente) => set({ paciente }),
  login: async (email, senha) => {
    try {
      const response = await fetch("http://192.168.85.166:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (response.ok) {
        await AsyncStorage.setItem("paciente", JSON.stringify(data));
        set({ paciente: data });

        return { sucesso: true };
      } else {
        return { sucesso: false, mensagem: data.message || "Erro no login" };
      }
    } catch (error) {
      console.error("Erro login:", error);
      return { sucesso: false, mensagem: "Erro de conexão com o servidor" };
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("paciente");
    set({ paciente: null });
  },
}));

export default useAuthStore;
