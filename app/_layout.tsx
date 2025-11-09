import { useKeepAwake } from "expo-keep-awake";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
    useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setVisibilityAsync("hidden").catch(() => {});
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
