// components/SquareColumn.tsx
import React, { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import Square from "./Square";

type Props = {
  count: number;
  maxHeight?: number;
  onMinus: () => void;
};

export default function SquareColumn({ count, maxHeight, onMinus }: Props) {
  const { width } = useWindowDimensions();

  const full = Math.floor(count / 5);
  const rest = count % 5;

  const GAP = 3;
  const MAX_BLOCKS = 6;
  const baseBOX = width * 0.25;

  let boxSize = baseBOX;
  if (maxHeight && maxHeight > 0) {
    const maxBoxByHeight = (maxHeight - GAP * (MAX_BLOCKS - 1)) / MAX_BLOCKS;
    boxSize = Math.min(baseBOX, maxBoxByHeight);
  }

  // Construyo EXACTAMENTE 6 bloques (relleno con 0 si falta)
  const blocks = useMemo(() => {
    const arr: number[] = Array(full).fill(5);
    if (rest > 0 || arr.length === 0) arr.push(rest);

    // recorto a 6 si sobran
    const sliced = arr.slice(0, MAX_BLOCKS);

    // relleno con 0 si faltan para completar 6
    while (sliced.length < MAX_BLOCKS) sliced.push(0);

    return sliced;
  }, [full, rest]);

  const topBlocks = blocks.slice(0, 3);
  const bottomBlocks = blocks.slice(3, 6);

  return (
    <View style={{ flex: 1, gap: GAP }}>
      {/* Arriba: 3 */}
      {topBlocks.map((c, i) => (
        <Square key={`t-${i}`} count={c} boxSize={boxSize} onMinus={onMinus} />
      ))}

      {/* Línea en el medio */}
      <View
        style={{
          height: 3,
          borderRadius: 10,
          backgroundColor: "white",
          marginVertical: GAP,
          alignSelf: "stretch",
        }}
      />

      {/* Abajo: 3 */}
      {bottomBlocks.map((c, i) => (
        <Square key={`b-${i}`} count={c} boxSize={boxSize} onMinus={onMinus} />
      ))}
    </View>
  );
}
