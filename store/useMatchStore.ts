import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type State = {
  a: number;            // fósforos “Nosotros”
  b: number;            // fósforos “Ellos”
  goal: number;
  tapToAdd: boolean;

  addStick: (team: "a" | "b", n?: number) => void;
  removeStick: (team: "a" | "b", n?: number) => void;
  reset: () => void;
  setGoal: (g: number) => void;
  loadFromStorage: () => Promise<void>;
  setTapToAdd: (t: boolean) => void;
};

const KEY = "truco@fosforos-state-v1";

export const useMatchStore = create<State>((set, get) => ({
  a: 0,
  b: 0,
  goal: 30,
  tapToAdd: false,

  addStick: (team, n = 1) => {
    const next = Math.max(0, Math.min(999, get()[team] + n));
    if (next !== get().goal + 1)
      set({ [team]: next } as any);
    persist();
  },

  removeStick: (team, n = 1) => {
    const next = Math.max(0, get()[team] - n);
    set({ [team]: next } as any);
    persist();
  },

  reset: () => {
    set({ a: 0, b: 0 });
    persist();
  },

  setGoal: (g) => {
    set({ goal: g });
    persist();
  },

  loadFromStorage: async () => {
    try {
      const raw = await AsyncStorage.getItem(KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      set({ ...get(), ...data });
    } catch { }
  },
  setTapToAdd: (t) => {
    set({ tapToAdd: t })
    persist();
  }
}));

async function persist() {
  try {
    const s = useMatchStore.getState();
    const payload = { a: s.a, b: s.b, goal: s.goal, tapToAdd: s.tapToAdd };
    await AsyncStorage.setItem(KEY, JSON.stringify(payload));
  } catch { }
}
