"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProgressoStore = {
  concluidas: Record<string, boolean>;
  marcadores: Record<string, boolean>;
  toggleConcluida: (id: string) => void;
  toggleMarcador: (id: string) => void;
  isConcluida: (id: string) => boolean;
  isMarcada: (id: string) => boolean;
  reset: () => void;
};

export const useProgresso = create<ProgressoStore>()(
  persist(
    (set, get) => ({
      concluidas: {},
      marcadores: {},
      toggleConcluida: (id) =>
        set((s) => ({ concluidas: { ...s.concluidas, [id]: !s.concluidas[id] } })),
      toggleMarcador: (id) =>
        set((s) => ({ marcadores: { ...s.marcadores, [id]: !s.marcadores[id] } })),
      isConcluida: (id) => !!get().concluidas[id],
      isMarcada: (id) => !!get().marcadores[id],
      reset: () => set({ concluidas: {}, marcadores: {} }),
    }),
    { name: "aulas-ia-progresso-v1" }
  )
);
