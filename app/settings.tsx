import { useMatchStore } from "@/store/useMatchStore";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Settings() {
  const r = useRouter();
  const { goal, setGoal, tapToAdd, setTapToAdd } = useMatchStore();

  return (
    <View style={ss.container}>
      <Text style={ss.h1}>Opciones</Text>

      {/* PUNTAJE OBJETIVO */}
      <View style={ss.row}>
        <Text style={ss.label}>Puntaje objetivo</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[15, 30].map((g) => (
            <Pressable
              key={g}
              style={[ss.pill, goal === g && ss.active]}
              onPress={() => {
                setGoal(g);
                Haptics.selectionAsync();
              }}
            >
              <Text style={ss.pillText}>{g}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* PULSA PARA SUMAR */}
      <View style={ss.row}>
        <Text style={ss.label}>Pulsa para sumar</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {[
            { label: "Si", value: true },
            { label: "No", value: false },
          ].map((opt) => (
            <Pressable
              key={opt.label}
              style={[ss.pill, tapToAdd === opt.value && ss.active]}
              onPress={() => {
                setTapToAdd(opt.value);
                Haptics.selectionAsync();
              }}
            >
              <Text style={ss.pillText}>{opt.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable style={[ss.btn]} onPress={() => r.back()}>
        <Text style={ss.btnText}>Volver</Text>
      </Pressable>
    </View>
  );
}

const ss = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0f172a", gap: 16 },
  h1: { color: "white", fontSize: 24, fontWeight: "800" },
  row: { gap: 8 },
  label: { color: "#93c5fd", fontWeight: "700" },
  pill: {
    backgroundColor: "#1f2937",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  active: { backgroundColor: "#3b82f6" },
  pillText: { color: "white", fontWeight: "700" },
  btn: {
    marginTop: "auto",
    backgroundColor: "#334155",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: { color: "white", fontWeight: "700" },
});
