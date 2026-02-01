// components/Square.tsx
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import SRC from "@/assets/images/fosforo.webp";

type Props = {
  count: number;
  boxSize: number;
  onMinus: () => void;
};

export default function Square({ count, boxSize, onMinus }: Props) {
  const n = Math.min(Math.max(count, 0), 5);

  const BOX = boxSize;
  const MARGIN = BOX * 0.02;
  const SIDE = BOX - MARGIN * 2;

  const MATCH_LONG = SIDE;
  const MATCH_THICK = BOX * 0.35;

  return (
    <Pressable
      onPress={onMinus}
      style={[styles.box, { width: BOX, height: BOX }]}
    >
      {/* LADO IZQUIERDO */}
      {n >= 1 && (
        <View
          style={[
            styles.matchWrapper,
            {
              width: MATCH_THICK,
              height: MATCH_LONG,
              left: MARGIN,
              top: MARGIN,
            },
          ]}
        >
          <Image source={SRC} style={styles.matchImage} />
        </View>
      )}

      {/* LADO SUPERIOR */}
      {n >= 2 && (
        <View
          style={[
            styles.matchWrapper,
            {
              width: MATCH_LONG,
              height: MATCH_THICK + BOX * 0.2,
              left: MARGIN,
              top: MARGIN - BOX * 0.15,
              transform: [{ rotate: "90deg" }],
            },
          ]}
        >
          <Image source={SRC} style={styles.matchImage} />
        </View>
      )}

      {/* LADO DERECHO */}
      {n >= 3 && (
        <View
          style={[
            styles.matchWrapper,
            {
              width: MATCH_THICK,
              height: MATCH_LONG,
              left: MARGIN + SIDE - MATCH_THICK,
              top: MARGIN,
              transform: [{ rotate: "180deg" }],
            },
          ]}
        >
          <Image source={SRC} style={styles.matchImage} />
        </View>
      )}

      {/* LADO INFERIOR */}
      {n >= 4 && (
        <View
          style={[
            styles.matchWrapper,
            {
              width: MATCH_LONG,
              height: MATCH_THICK + BOX * 0.2,
              left: MARGIN,
              top: MARGIN + SIDE - MATCH_THICK - BOX * 0.06,
              transform: [{ rotate: "270deg" }],
            },
          ]}
        >
          <Image source={SRC} style={styles.matchImage} />
        </View>
      )}

      {/* DIAGONAL */}
      {n >= 5 && (
        <View
          style={[
            styles.matchWrapper,
            {
              width: MATCH_LONG,
              height: MATCH_THICK + BOX * 0.2,
              left: MARGIN,
              top: MARGIN + SIDE * 0.18,
              transform: [{ rotate: "225deg" }],
            },
          ]}
        >
          <Image source={SRC} style={styles.matchImage} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: {
    position: "relative",
    alignSelf: "center",
  },
  matchWrapper: {
    position: "absolute",
  },
  matchImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
