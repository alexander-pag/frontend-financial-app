import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getSession } from "../../../services/auth.service";
import { getOneUser } from "../../../services/user.service";
import { Screen } from "../../../components/Screen";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userId = await getSession();
      const response = await getOneUser(userId);
      setUser(response);
    };

    getUser();
  }, []);

  return (
    <Screen>
      <View className="px-2 py-5">
        <Text className="font-bold text-xl mb-4">Mi perfil</Text>
        {user ? (
          <View className="mb-4 bg-gray-100 shadow-lg border px-2">
            <Text className="font-semibold text-lg">Nombre: {user.name}</Text>
            <Text className="text-gray-600 text-lg">Correo: {user.email}</Text>
          </View>
        ) : (
          <Text className="text-gray-600 text-lg">Cargando...</Text>
        )}
      </View>
    </Screen>
  );
}
