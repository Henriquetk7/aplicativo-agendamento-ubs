import { create } from "zustand";

export const usePacienteStore = create((set) => ({
  paciente: null,
  setPaciente: (paciente) => set({ paciente }),
  limparPaciente: () => set({ paciente: null }),
}));
