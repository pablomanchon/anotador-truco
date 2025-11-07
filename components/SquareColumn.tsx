// components/SquareColumn.tsx
import React from "react";
import { View } from "react-native";
import Square from "./Square";

export default function SquareColumn({ count }: { count: number }) {
  const full = Math.floor(count / 5);
  const rest = count % 5;

  const blocks: number[] = Array(full).fill(5);
  if (rest > 0 || blocks.length === 0) blocks.push(rest);

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        gap: 3,
      }}
    >
      {blocks.map((c, i) => (
        <Square key={i} count={c} />
      ))}
    </View>
  );
}
