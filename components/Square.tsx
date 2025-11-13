// components/Square.tsx
import React from "react";
import { Image, StyleSheet, View } from "react-native";

import SRC from "@/assets/images/fosforo.webp";

type Props = {
  count: number;
  boxSize: number; // 🔹 ahora viene de arriba
};

export default function Square({ count, boxSize }: Props) {
  const n = Math.min(Math.max(count, 0), 5);

  const BOX = boxSize;
  const MARGIN = BOX * 0.02;
  const SIDE = BOX - MARGIN * 2;

  const MATCH_LONG = SIDE;
  const MATCH_THICK = BOX * 0.35;

  return (
    <View style={[styles.box, { width: BOX, height: BOX }]}>
      {/* LADO IZQUIERDO */}
      {n >= 1 && (
        <Image
          source={SRC}
          style={[
            styles.match,
            {
              width: MATCH_THICK,
              height: MATCH_LONG,
              left: MARGIN,
              top: MARGIN,
            },
          ]}
        />
      )}

      {/* LADO SUPERIOR */}
      {n >= 2 && (
        <Image
          source={SRC}
          style={[
            styles.match,
            {
              width: MATCH_LONG,
              height: MATCH_THICK + BOX * 0.2,
              left: MARGIN,
              top: MARGIN - BOX * 0.15,
              transform: [{ rotate: "90deg" }],
            },
          ]}
        />
      )}

      {/* LADO DERECHO */}
      {n >= 3 && (
        <Image
          source={SRC}
          style={[
            styles.match,
            {
              width: MATCH_THICK,
              height: MATCH_LONG,
              left: MARGIN + SIDE - MATCH_THICK,
              top: MARGIN,
              transform: [{ rotate: "180deg" }],
            },
          ]}
        />
      )}

      {/* LADO INFERIOR */}
      {n >= 4 && (
        <Image
          source={SRC}
          style={[
            styles.match,
            {
              width: MATCH_LONG,
              height: MATCH_THICK + BOX * 0.2,
              left: MARGIN,
              top: MARGIN + SIDE - MATCH_THICK - BOX * 0.06,
              transform: [{ rotate: "270deg" }],
            },
          ]}
        />
      )}

      {/* DIAGONAL */}
      {n >= 5 && (
        <Image
          source={SRC}
          style={[
            styles.match,
            {
              width: MATCH_LONG,
              height: MATCH_THICK + BOX * 0.2,
              left: MARGIN,
              top: MARGIN + SIDE * 0.18,
              transform: [{ rotate: "225deg" }],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "relative",
    alignSelf: "center",
  },
  match: {
    position: "absolute",
    resizeMode: "contain",
  },
});
