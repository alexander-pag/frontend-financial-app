import React from "react";
import { Button, Text, View } from "react-native";
import { useAuth } from "../../../context/authContext";
import { Screen } from "../../../components/Screen";

export default function About() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Info:</Text>
        <Button title="Cerrar sesión" onPress={handleLogout} />
      </View>
    </Screen>
  );
}
