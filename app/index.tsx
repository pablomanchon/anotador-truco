import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Alert, ImageBackground, Pressable, Text, View } from "react-native";

import bgWood from "@/assets/woodV.png";
import { DropZone } from "@/components/DropZone";
import Fosforo from "@/components/Fosforo";
import { useMatchStore } from "@/store/useMatchStore";
import { s } from "../styles/styles";

type Rect = { x: number; y: number; width: number; height: number };

export default function Home() {
  const r = useRouter();
  const { a, b, goal, addStick, removeStick, reset, loadFromStorage } = useMatchStore();

  useEffect(() => { loadFromStorage(); }, [loadFromStorage]);

  useEffect(() => {
    if (a >= goal || b >= goal) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const ganador = a >= goal ? "Nosotros" : "Ellos";
      Alert.alert("¡Partida!", `${ganador} ganan ${Math.max(a, b)} a ${Math.min(a, b)}.`);
    }
  }, [a, b, goal]);

  // refs y rects absolutos (pantalla) para zonas
  const aRef = useRef<View>(null);
  const bRef = useRef<View>(null);
  const dropA = useRef<Rect | null>(null);
  const dropB = useRef<Rect | null>(null);

  const measureZones = () => {
    aRef.current?.measureInWindow((x, y, w, h) => { dropA.current = { x, y, width: w, height: h }; });
    bRef.current?.measureInWindow((x, y, w, h) => { dropB.current = { x, y, width: w, height: h }; });
  };

  useEffect(() => {
    // medir al montar y tras layout
    const t = setTimeout(measureZones, 0);
    return () => clearTimeout(t);
  });

  const handleDrop = (absX: number, absY: number) => {
    if (isInside(dropA.current, absX, absY)) { addStick("a"); Haptics.selectionAsync(); return true; }
    if (isInside(dropB.current, absX, absY)) { addStick("b"); Haptics.selectionAsync(); return true; }
    return false;
  };

  return (
    <ImageBackground source={bgWood} resizeMode="cover" style={s.container}>
      <Text style={s.title}>Anotador de Truco (Fósforos)</Text>

      <View style={s.zones} onLayout={measureZones}>
        <DropZone ref={aRef} label="Nosotros" count={a} goal={goal} onLongMinus={() => removeStick("a")} />
        <DropZone ref={bRef} label="Ellos" count={b} goal={goal} onLongMinus={() => removeStick("b")} />
      </View>

      {/* Fósforo suelto de prueba */}
      <Fosforo onDrop={handleDrop} />

      <View style={s.bottom}>
        <Pressable style={[s.btn, s.danger]} onPress={() => confirmReset(reset)}>
          <Text style={s.btnText}>Reiniciar</Text>
        </Pressable>
        <Pressable style={[s.btn, s.primary]} onPress={() => r.push("/settings")}>
          <Text style={s.btnText}>Opciones</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

function confirmReset(reset: () => void) {
  Alert.alert("Reiniciar partida", "¿Seguro que querés reiniciar?", [
    { text: "Cancelar", style: "cancel" },
    { text: "Sí", style: "destructive", onPress: () => reset() },
  ]);
}

function isInside(rect: Rect | null, x: number, y: number) {
  if (!rect) return false;
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
}
