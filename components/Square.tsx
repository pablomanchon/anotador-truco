import SRC from "@/assets/images/fosforo.webp";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

type Props = {
  count: number;
  boxSize: number;
  onMinus: () => void;
  disabled?: boolean;
};

export default function Square({ count, boxSize, onMinus, disabled }: Props) {
  const n = Math.min(Math.max(count, 0), 5);

  const BOX = boxSize;
  const MARGIN = BOX * 0.02;
  const SIDE = BOX - MARGIN * 2;

  const MATCH_LONG = SIDE;
  const MATCH_THICK = BOX * 0.35;

  const isDisabled = disabled ?? n === 0;

  const hitSlop = Math.max(6, BOX * 0.04);

  const MatchPressable = ({ style }: { style: any }) => (
    <Pressable
      onPress={onMinus}
      disabled={isDisabled}
      hitSlop={hitSlop}
      style={[styles.matchWrapper, style]}
    >
      <Image source={SRC} style={styles.matchImage} />
    </Pressable>
  );

  return (
    <View style={[styles.box, { width: BOX, height: BOX, opacity: isDisabled ? 0.25 : 1 }]}>
      {/* LADO IZQUIERDO */}
      {n >= 1 && (
        <MatchPressable
          style={{
            width: MATCH_THICK,
            height: MATCH_LONG,
            left: MARGIN,
            top: MARGIN,
          }}
        />
      )}

      {/* LADO SUPERIOR */}
      {n >= 2 && (
        <MatchPressable
          style={{
            width: MATCH_LONG,
            height: MATCH_THICK + BOX * 0.2,
            left: MARGIN,
            top: MARGIN - BOX * 0.15,
            transform: [{ rotate: "90deg" }],
          }}
        />
      )}

      {/* LADO DERECHO */}
      {n >= 3 && (
        <MatchPressable
          style={{
            width: MATCH_THICK,
            height: MATCH_LONG,
            left: MARGIN + SIDE - MATCH_THICK,
            top: MARGIN,
            transform: [{ rotate: "180deg" }],
          }}
        />
      )}

      {/* LADO INFERIOR */}
      {n >= 4 && (
        <MatchPressable
          style={{
            width: MATCH_LONG,
            height: MATCH_THICK + BOX * 0.2,
            left: MARGIN,
            top: MARGIN + SIDE - MATCH_THICK - BOX * 0.06,
            transform: [{ rotate: "270deg" }],
          }}
        />
      )}

      {/* DIAGONAL */}
      {n >= 5 && (
        <MatchPressable
          style={{
            width: MATCH_LONG,
            height: MATCH_THICK + BOX * 0.2,
            left: MARGIN,
            top: MARGIN + SIDE * 0.18,
            transform: [{ rotate: "225deg" }],
          }}
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
  matchWrapper: {
    position: "absolute",
  },
  matchImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
