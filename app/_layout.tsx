import { useKeepAwake } from "expo-keep-awake";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  useKeepAwake(); // mantiene la pantalla encendida durante el partido
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
