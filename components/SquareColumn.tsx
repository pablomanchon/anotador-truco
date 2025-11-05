// components/SquareColumn.tsx
import React from "react";
import { View } from "react-native";
import Square from "./Square";

export default function SquareColumn({ count }: { count: number }) {
  // cuántos cuadrados completos de 5
  const full = Math.floor(count / 5);
  const rest = count % 5;

  // armamos lista: [5,5,5,...,rest] y siempre mostramos al menos 1 cuadrado
  const blocks: number[] = Array(full).fill(5);
  if (rest > 0 || blocks.length === 0) blocks.push(rest);

  return (
    <View style={{ gap: 8, alignItems: "center" }}>
      {blocks.map((c, i) => (
        <Square key={i} count={c} />
      ))}
    </View>
  );
}
