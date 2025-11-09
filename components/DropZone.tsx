import * as Haptics from "expo-haptics";
import React, { forwardRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS } from "react-native-reanimated";
import SquareColumn from "./SquareColumn";

type Props = {
  label: string;
  count: number;
  goal: number;
  onMinus: () => void;
};

export const DropZone = forwardRef<View, Props>(function DZ(
  { label, count, goal, onMinus },
  ref
) {
  const tap = Gesture.Tap()
    .maxDuration(300)
    .maxDelay(100)
    .maxDistance(15) // si te movés más que esto, cancela
    .onEnd((_e, success) => {
      "worklet";
      if (success) {
        runOnJS(Haptics.selectionAsync)();
        runOnJS(onMinus)();
      }
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View ref={ref} style={s.zone}>
        <Text style={s.zoneLabel}>{label}</Text>
        <Text style={s.zoneScore}>{count} / {goal}</Text>

        <View style={{ flex: 1, position: "relative" }}>
          <View style={{ position: "absolute", width: "100%", backgroundColor: "white", height: 3, borderRadius: 10, top: "50%" }} />
          <SquareColumn count={count} />
        </View>

        <View style={s.minusHint}>
          <Text style={s.minusText}>Tocá para restar</Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
});

const s = StyleSheet.create({
  zone: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "rgba(11, 18, 32, 0.69)", // fijo, sin cambios al toque
    elevation: 10,
  },
  zoneLabel: { color: "#93c5fd", fontWeight: "700" },
  zoneScore: { color: "white", fontSize: 28, fontWeight: "900" },
  minusHint: { opacity: 0.6, marginTop: 6, alignSelf: "center" },
  minusText: { color: "#cbd5e1", fontSize: 12 },
});
