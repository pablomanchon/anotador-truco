import React, { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import SquareColumn from "./SquareColumn";

type Props = {
  label: string;
  count: number;
  goal: number;
  onLongMinus: () => void;
};

export const DropZone = forwardRef<View, Props>(function DZ(
  { label, count, goal, onLongMinus },
  ref
) {
  const { height } = useWindowDimensions();

  // Altura casi total (dejamos margen de 180 px para botones/fósforo)
  const dynamicHeight = height - 120;

  return (
    <View ref={ref} style={[s.zone, { height: dynamicHeight }]}>
      <Text style={s.zoneLabel}>{label}</Text>
      <Text style={s.zoneScore}>
        {count} / {goal}
      </Text>
      <View >
        <SquareColumn count={count} />
      </View>

      <Pressable onLongPress={onLongMinus} style={s.minusHint}>
        <Text style={s.minusText}>Mantener para restar</Text>
      </Pressable>
    </View>
  );
});

const s = StyleSheet.create({
  zone: {
    flex: 1,
    backgroundColor: "rgba(11, 18, 32, 0.69)",
    elevation:10,
    borderRadius: 16,
    padding: 14,
  },
  zoneLabel: { color: "#93c5fd", fontWeight: "700" },
  zoneScore: { color: "white", fontSize: 28, fontWeight: "900"},
  minusHint: { opacity: 0.6, marginTop: 6, alignSelf: "flex-start" },
  minusText: { color: "#cbd5e1", fontSize: 12 },
});
