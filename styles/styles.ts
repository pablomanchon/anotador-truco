import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 14, position: 'relative' },
  title: { color: "white", fontSize: 22, fontWeight: "800", textAlign: "center", paddingTop: 15 },

  zones: { flexDirection: "row", gap: 10, flex: 1 },
  zone: { flex: 1, backgroundColor: "#0b1220", borderRadius: 16, padding: 14 },
  zoneLabel: { color: "#93c5fd", fontWeight: "700" },
  zoneScore: { color: "white", fontSize: 28, fontWeight: "900", marginBottom: 8 },

  tallyGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  fiveWrap: {
    width: 54,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: 8,
    backgroundColor: "#0f172a",
  },
  stick: { width: 4, height: 28, backgroundColor: "#eab308", borderRadius: 2, marginHorizontal: 3 },
  diag: {
    position: "absolute",
    width: 4,
    height: 36,
    backgroundColor: "#e11d48",
    borderRadius: 2,
    transform: [{ rotate: "-50deg" }],
  },

  minusHint: { marginTop: 8, alignSelf: "flex-start", opacity: 0.6 },
  minusText: { color: "#cbd5e1", fontSize: 12 },

  poolWrapper: { marginTop: 8 },
  poolLabel: { color: "#cbd5e1", textAlign: "center", marginBottom: 6 },
  pool: { backgroundColor: "#0b1220", borderRadius: 16, padding: 12 },
  poolRow: { minHeight: 64, flexDirection: "row", alignItems: "center", gap: 6 },
  poolStick: { width: 6, height: 28, backgroundColor: "#94a3b8", borderRadius: 2, opacity: 0.4 },
  dragWrap: { position: "absolute", left: 12, top: 16 }, // posición inicial del drag
  dragStick: { width: 8, height: 34, backgroundColor: "#f59e0b", borderRadius: 2 },

  bottom: { marginTop: "auto", flexDirection: "row", gap: 8,zIndex:0 },
  btn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: "center" },
  btnText: { color: "white", fontWeight: "700" },
  square: {
    position: 'relative',
    padding: 20,
    flex: 1
  }
});