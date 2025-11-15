// components/Square.tsx
import React from "react";
import { GestureResponderEvent, Image, Pressable, StyleSheet, View } from "react-native";

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

  const handlePressMatch = (e: GestureResponderEvent) => {
    e.stopPropagation();
    onMinus();
  };

  return (
    <View style={[styles.box, { width: BOX, height: BOX }]}>
      {/* LADO IZQUIERDO */}
      {n >= 1 && (
        <Pressable
          onPress={handlePressMatch}
          style={[
            styles.matchWrapper,
            {
              width: MATCH_THICK,
              height: MATCH_LONG,
              left: MARGIN,
              top: MARGIN,
            },
          ]}
          hitSlop={8}
        >
          <Image source={SRC} style={styles.matchImage} />
        </Pressable>
      )}

      {/* LADO SUPERIOR */}
      {n >= 2 && (
        <Pressable
          onPress={handlePressMatch}
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
          hitSlop={8}
        >
          <Image source={SRC} style={styles.matchImage} />
        </Pressable>
      )}

      {/* LADO DERECHO */}
      {n >= 3 && (
        <Pressable
          onPress={handlePressMatch}
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
          hitSlop={8}
        >
          <Image source={SRC} style={styles.matchImage} />
        </Pressable>
      )}

      {/* LADO INFERIOR */}
      {n >= 4 && (
        <Pressable
          onPress={handlePressMatch}
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
          hitSlop={8}
        >
          <Image source={SRC} style={styles.matchImage} />
        </Pressable>
      )}

      {/* DIAGONAL */}
      {n >= 5 && (
        <Pressable
          onPress={handlePressMatch}
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
          hitSlop={8}
        >
          <Image source={SRC} style={styles.matchImage} />
        </Pressable>
      )}
    </View>
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
