import { s } from "@/styles/styles";
import * as Haptics from "expo-haptics";
import { useRef, useState } from "react";
import { Animated, LayoutRectangle, PanResponder, Text, View } from "react-native";

export function FosforoPool({ onDrop }: { onDrop: (x: number, y: number) => boolean }) {
  const [dragging, setDragging] = useState(false);
  const start = useRef({ x: 0, y: 0 });
  const trans = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const wrapRef = useRef<View | null>(null);
  const wrapLayout = useRef<LayoutRectangle | null>(null);

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, g) => {
        setDragging(true);
        start.current = { x: g.x0, y: g.y0 };
      },
      onPanResponderMove: Animated.event([null, { dx: trans.x, dy: trans.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, g) => {
        setDragging(false);
        // posición absoluta en pantalla
        const absX = g.moveX;
        const absY = g.moveY;
        const dropped = onDrop(absX, absY);
        Animated.spring(trans, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
        if (!dropped) {
          // feedback suave si volvió
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      },
    })
  ).current;

  return (
    <View
      ref={wrapRef}
      onLayout={(e) => (wrapLayout.current = e.nativeEvent.layout)}
      style={s.pool}
    >
      <View style={s.poolRow}>
        {/* “Infinitos” fósforos visuales */}
        {Array.from({ length: 12 }).map((_, i) => (
          <View key={i} style={s.poolStick} />
        ))}
        {/* Draggable real */}
        <Animated.View style={[s.dragWrap, trans.getLayout()]} {...pan.panHandlers}>
          <View style={s.dragStick} />
        </Animated.View>
      </View>
      <Text style={s.poolHelp}>Arrastrá el fósforo flotante</Text>
    </View>
  );
}