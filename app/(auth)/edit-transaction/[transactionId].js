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
import { getOneTransactionById } from "../../../services/transaction.service";

export default function EditTransaction() {
  const { transactionId } = useLocalSearchParams();
  const [transactionInfo, setTransactionInfo] = useState(null);

  useEffect(() => {
    if (transactionId) {
      const fetchTransactionById = async (transactionId) => {
        const transaction = await getOneTransactionById(transactionId);
        setTransactionInfo(transaction);
      };

      fetchTransactionById(transactionId);
    }
  }, [transactionId]);

  const handleSave = async () => {
    Alert.alert("Guardando...");
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FF7D29" },
          headerTintColor: "#FEFAE0",
          headerTitle: "Editar Transacción",
        }}
      />
      <View style={{ paddingHorizontal: 16, paddingTop: 20 }}>
        {transactionInfo === null ? (
          <ActivityIndicator color={"#FF7D29"} size={"large"} />
        ) : (
          <View>
            <TextInput
              value={transactionInfo.description}
              onChangeText={(text) =>
                setTransactionInfo({ ...transactionInfo, description: text })
              }
              style={{
                borderColor: "#CCCCCC",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 20,
                fontSize: 16,
              }}
              placeholder="Monto"
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
