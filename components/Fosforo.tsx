// Fosforo.tsx
import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { View } from "./Themed";

type Props = { onDrop?: (absX: number, absY: number) => boolean };

// Medidas del fósforo dibujado
const MATCH_W = 40;
const MATCH_H = 100;

// Medidas de la caja (ajustá a tu webp)
const BOX_W = 70;
const BOX_H = 110;

export default function Fosforo({ onDrop }: Props) {
  const { width, height } = useWindowDimensions();

  // Posición inicial (centro-abajo)
  const startX = width / 2 - MATCH_W / 2;
  const startY = height - 150;

  // Posición de la caja: centrada respecto al fósforo y un poquito más abajo
  const boxLeft = startX - (BOX_W - MATCH_W) / 2;
  const boxTop = startY + 8;

  const x = useSharedValue(startX);
  const y = useSharedValue(startY);

  // Zona interna (tolerancia) para el hit-test de la caja
  const hitPad = 10;
  const boxLeftInner = boxLeft + hitPad;
  const boxTopInner = boxTop + hitPad;
  const boxRightInner = boxLeft + BOX_W - hitPad;
  const boxBottomInner = boxTop + BOX_H - hitPad;

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      x.value = e.translationX + startX;
      y.value = e.translationY + startY;
    })
    .onEnd((e) => {
      // ✅ usar el centro del fósforo para el hit-test
      const cx = x.value + MATCH_W / 2;
      const cy = y.value + MATCH_H / 2;

      const isInBox =
        cx >= boxLeftInner &&
        cx <= boxRightInner &&
        cy >= boxTopInner &&
        cy <= boxBottomInner;

      // Si quedó dentro de la caja → NO disparar onDrop
      if (!isInBox && onDrop) {
        runOnJS(onDrop)(e.absoluteX, e.absoluteY);
      }

      // Volver a la posición inicial
      x.value = withSpring(startX);
      y.value = withSpring(startY);
    });

  const matchStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
    // Gira levemente según desplazamiento horizontal (sin inclinar al inicio)
    transform: [{ rotate: `${(x.value - startX) / 20}deg` }],
    padding: 5,
    elevation:11
  }));

  return (
    <>
      {/* Caja (debajo del fósforo) */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: boxLeft,
          top: boxTop,
          backgroundColor: 'transparent',
          zIndex: 0,
          elevation:11
        }}
      >
        <Image
          source={require("@/assets/images/caja-fosforos.webp")}
          style={{ width: BOX_W, height: BOX_H, resizeMode: "contain" }}
        />
      </View>

      {/* Fósforo draggable (encima) */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={matchStyle}>
          <Image
            source={require("@/assets/images/fosforo.webp")}
            style={{ width: MATCH_W, height: MATCH_H, resizeMode: "contain" }}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
}
