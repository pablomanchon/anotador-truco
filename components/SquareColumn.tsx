// components/SquareColumn.tsx
import React from "react";
import { View, useWindowDimensions } from "react-native";
import Square from "./Square";

type Props = {
  count: number;
  maxHeight?: number;
};

export default function SquareColumn({ count, maxHeight }: Props) {
  const { width } = useWindowDimensions();

  const full = Math.floor(count / 5);
  const rest = count % 5;

  const blocks: number[] = Array(full).fill(5);
  if (rest > 0 || blocks.length === 0) blocks.push(rest);

  const GAP = 3;
  const MAX_BLOCKS = 6; // 👈 siempre calculamos pensando en 6

  const baseBOX = width * 0.25;

  let boxSize = baseBOX;
  if (maxHeight && maxHeight > 0) {
    // altura por bloque suponiendo 6 bloques SIEMPRE
    const maxBoxByHeight =
      (maxHeight - GAP * (MAX_BLOCKS - 1)) / MAX_BLOCKS;

    boxSize = Math.min(baseBOX, maxBoxByHeight);
  }

  return (
    <View
      style={{
        flex: 1,
        gap: GAP,
      }}
    >
      {blocks.map((c, i) => (
        <Square key={i} count={c} boxSize={boxSize} />
      ))}
    </View>
  );
}
