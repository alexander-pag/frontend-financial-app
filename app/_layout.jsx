import { Stack } from "expo-router";
import { AuthProvider } from "../context/authContext";
import Header from "../components/Header";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = async (nextAppState) => {
    if (nextAppState === "background" || nextAppState === "inactive") {
      // Aquí eliminamos el token y userID para cerrar la sesión
      try {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userID");
        console.log("Sesión cerrada al cerrar la aplicación.");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    }
  };

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="light" backgroundColor="#FF7D29" />
        <Stack
          screenOptions={{
            header: () => <Header />,
          }}
        >
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
