import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  onDrop?: (absX: number, absY: number) => boolean;
};

const Fosforo = ({ onDrop }: Props) => {
  const { width, height } = useWindowDimensions();

  // 📍 posición inicial: centrado horizontal y un poco arriba del borde inferior
  const startX = width / 2 - 20; // ancho del fósforo aprox 40
  const startY = height - 150; // a unos 150px del fondo

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

  const animatedStyle = useAnimatedStyle(() => ({
    position: "absolute",
    left: x.value,
    top: y.value,
    transform: [{ rotate: "0deg" }], // 🔹 siempre recto
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={animatedStyle}>
        <Image
          source={require("@/assets/images/fosforo.png")}
          style={{ width: 40, height: 100, resizeMode: "contain" }}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Fosforo;
