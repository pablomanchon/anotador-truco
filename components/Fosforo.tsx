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

const Fosforo = ({ onDrop }: Props) => {
  const { width, height } = useWindowDimensions();

  // Posición inicial del fósforo (centro-abajo)
  const startX = width / 2 - 20;  // fósforo ~40 px de ancho
  const startY = height - 150;

  // Tamaño de la caja (ajustá a tu PNG)
  const BOX_W = 70;
  const BOX_H = 110;

  // Posición de la caja: centrada respecto al fósforo y un poco más abajo
  const boxLeft = startX - (BOX_W - 40) / 2;
  const boxTop = startY + 8;

  const x = useSharedValue(startX);
  const y = useSharedValue(startY);

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      x.value = e.translationX + startX;
      y.value = e.translationY + startY;
    })
    .onEnd((e) => {
      if (onDrop) runOnJS(onDrop)(e.absoluteX, e.absoluteY);
      x.value = withSpring(startX);
      y.value = withSpring(startY);
    });

  const matchStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
    transform: [{ rotate: "0deg" }], // recto
    zIndex: 10,                      // arriba de la caja
  }));

  return (
    <>
      {/* Caja fija detrás del fósforo */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          left: boxLeft,
          top: boxTop,
          backgroundColor:"rgb(0,0,0,0)",
          zIndex: 0,
        }}
      >
        <Image
          source={require("@/assets/images/caja-fosforos.png")}
          style={{
            width: BOX_W,
            height: BOX_H,
            resizeMode: "contain",
          }}
        />
      </View>

      {/* Fósforo draggable por encima */}
      <GestureDetector gesture={gesture}>
        <Animated.View style={matchStyle}>
          <Image
            source={require("@/assets/images/fosforo.png")}
            style={{ width: 40, height: 100, resizeMode: "contain" }}
          />
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export default Fosforo;
