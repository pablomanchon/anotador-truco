import React, { forwardRef } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

  return (
    <View ref={ref} style={[s.zone]}>
      <Text style={s.zoneLabel}>{label}</Text>
      <Text style={s.zoneScore}>
        {count} / {goal}
      </Text>
      <View style={{ flex: 1, position:'relative'}}>
        <View style={{position:"absolute",width:'100%',backgroundColor:'white',height:3,borderRadius:10,top:'50%'}}/>
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
    elevation: 10,
    borderRadius: 16,
    padding: 14,
  },
  zoneLabel: { color: "#93c5fd", fontWeight: "700" },
  zoneScore: { color: "white", fontSize: 28, fontWeight: "900" },
  minusHint: { opacity: 0.6, marginTop: 6, alignSelf: "flex-start" },
  minusText: { color: "#cbd5e1", fontSize: 12 },
});
