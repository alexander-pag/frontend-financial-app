import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Screen } from "../../../components/Screen";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { getOneAccountById } from "../../../services/account.service";

export default function EditAccount() {
  const { accountId } = useLocalSearchParams();
  const [accountInfo, setAccountInfo] = useState(null);

  useEffect(() => {
    if (accountId) {
      const fetchAccountById = async (accountId) => {
        const category = await getOneAccountById(accountId);
        setAccountInfo(category);
      };

      fetchAccountById(accountId);
    }
  }, [accountId]);

  const handleSave = async () => {
    Alert.alert("Guardando...");
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FF7D29" },
          headerTintColor: "#FEFAE0",
          headerTitle: "Editar Categoría",
        }}
      />
      <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
        {accountInfo === null ? (
          <ActivityIndicator color={"#FF7D29"} size={"large"} />
        ) : (
          <View>
            <TextInput
              value={accountInfo.name}
              onChangeText={(text) =>
                setAccountInfo({ ...accountInfo, name: text })
              }
              style={{
                borderColor: "#CCCCCC",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 20,
                fontSize: 16,
              }}
              placeholder="Nombre de la cuenta"
            />
            <Pressable
              onPress={handleSave}
              style={{
                backgroundColor: "#4A90E2",
                borderRadius: 25,
                paddingVertical: 12,
                paddingHorizontal: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 5,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Guardar
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </Screen>
  );
}
