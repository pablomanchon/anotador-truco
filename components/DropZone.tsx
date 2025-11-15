// DropZone.tsx
import * as Haptics from "expo-haptics";
import React, { forwardRef, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated from "react-native-reanimated";
import SquareColumn from "./SquareColumn";

type Props = {
  label: string;
  count: number;
  goal: number;
  onMinus: () => void; // tocar fósforo → resta
  onDrop: () => void;  // tocar zona → suma
  tapToAdd: boolean;
};

export const DropZone = forwardRef<View, Props>(function DZ(
  { label, count, goal, onMinus, onDrop, tapToAdd },
  ref
) {
  const [centerHeight, setCenterHeight] = useState(0);

  // 👉 SUMAR
  const handlePlus = () => {
    Haptics.selectionAsync();
    onDrop();
  };

  const handleCenterLayout = (e: LayoutChangeEvent) => {
    setCenterHeight(e.nativeEvent.layout.height);
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={tapToAdd ? handlePlus : onMinus}>
      <Animated.View ref={ref} style={s.zone}>
        <Text style={s.zoneLabel}>{label}</Text>
        <Text style={s.zoneScore}>
          {count} / {goal}
        </Text>

        <View
          style={{ flex: 1, position: "relative" }}
          onLayout={handleCenterLayout}
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              backgroundColor: "white",
              height: 3,
              borderRadius: 10,
              top: "50%",
            }}
          />

          {/* 👉 Todos los fósforos RESTAN */}
          <SquareColumn
            count={count}
            maxHeight={centerHeight}
            onMinus={onMinus}
          />
        </View>

        <View style={s.minusHint}>
          <Text style={s.minusText}>{tapToAdd ? "Tocá los fosforos para restar" : "Toca para restar"}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
});

const s = StyleSheet.create({
  zone: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "rgba(11, 18, 32, 0.69)",
    elevation: 10,
  },
  zoneLabel: { color: "#93c5fd", fontWeight: "700" },
  zoneScore: { color: "white", fontSize: 28, fontWeight: "900" },
  minusHint: { opacity: 0.6, marginTop: 6, alignSelf: "center" },
  minusText: { color: "#cbd5e1", fontSize: 12, textAlign: "center" },
});
