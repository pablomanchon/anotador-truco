import { useKeepAwake } from "expo-keep-awake";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  useEffect(() => {
    if (Platform.OS === "android") {
      // Fondo del sistema transparente
      SystemUI.setBackgroundColorAsync("transparent");

      // Ocultar barra de navegación inferior (modo inmersivo)
      NavigationBar.setVisibilityAsync("hidden").catch(() => {});
      // Permite mostrarla con swipe y vuelve a ocultarse
      NavigationBar.setBehaviorAsync("overlay-swipe").catch(() => {});
      // (opcional) Si aparece, que sea transparente y con iconos claros
      NavigationBar.setBackgroundColorAsync("transparent").catch(() => {});
      NavigationBar.setButtonStyleAsync("light").catch(() => {});
    }
  }, []);

  useKeepAwake();

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#0f172a" }}>
      {/* Oculta barra de estado (arriba) */}
      <StatusBar hidden />
      <Stack screenOptions={{ headerShown: false }} />
    </GestureHandlerRootView>
  );
}
