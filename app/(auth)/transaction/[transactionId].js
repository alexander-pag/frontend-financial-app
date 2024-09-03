import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { Screen } from "../../../components/Screen";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { getOneTransactionById } from "../../../services/transaction.service";

export default function TransactionDetail() {
  const { transactionId } = useLocalSearchParams();
  const [transactionInfo, setTransactionInfo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (transactionId) {
      const fetchtransactionById = async (transactionId) => {
        const transaction = await getOneTransactionById(transactionId);
        setTransactionInfo(transaction);
      };

      fetchtransactionById(transactionId);
    }
  }, [transactionId]);

  const handleDelete = () => {
    // Lógica para eliminar la categoría
    setModalVisible(false);
    Alert.alert("Categoría eliminada");
  };

  const formatBalance = (value) => {
    // Convierte el valor a cadena si es un número
    const stringValue = value.toString();
    // Divide en grupos de tres dígitos desde el final y agrega puntos
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FF7D29" },
          headerTintColor: "#FEFAE0",
          headerLeft: () => {},
          headerTitle: "Detalle de transacción",
          headerRight: () => {},
        }}
      />
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 20 }}>
        {transactionInfo === null ? (
          <ActivityIndicator color={"#FF7D29"} size={"large"} />
        ) : (
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Link asChild href={`edit-transaction/${transactionId}`}>
                <Pressable
                  style={{
                    backgroundColor: "#4A90E2",
                    borderRadius: 25,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    width: "45%",
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
                    Editar
                  </Text>
                </Pressable>
              </Link>
              <Pressable
                onPress={() => setModalVisible(true)}
                style={{
                  backgroundColor: "#D0021B",
                  borderRadius: 25,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  width: "45%",
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
                  Eliminar
                </Text>
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    color: "#333333",
                    textAlign: "center",
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  Cuenta: {transactionInfo.account.name}
                </Text>
                <Text
                  style={{
                    color: "#666666",
                    marginTop: 16,
                    fontSize: 16,
                    width: "90%",
                  }}
                >
                  Monto: $ {formatBalance(transactionInfo.amount)}
                </Text>
                <Text
                  style={{
                    color: "#666666",
                    marginTop: 16,
                    fontSize: 16,
                    width: "90%",
                  }}
                >
                  Descripción: {transactionInfo.description}
                </Text>
                <Text
                  style={{
                    color: "#666666",
                    marginTop: 16,
                    fontSize: 16,
                    width: "90%",
                  }}
                >
                  Balance: $ {formatBalance(transactionInfo.account.balance)}
                </Text>
                <Text
                  style={{
                    color: "#666666",
                    marginTop: 16,
                    fontSize: 16,
                    width: "90%",
                  }}
                >
                  Tipo: {transactionInfo.type}
                </Text>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              ¿Estás seguro de eliminar esta categoría?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Pressable
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: "#4A90E2",
                  borderRadius: 25,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  width: "45%",
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
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={handleDelete}
                style={{
                  backgroundColor: "#D0021B",
                  borderRadius: 25,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  width: "45%",
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
                  Eliminar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}