import { useEffect, useState } from "react";
import { Screen } from "../Screen";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getAllTransactions } from "../../services/transaction.service";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function TransactionGetAll() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await getAllTransactions();
      setTransactions(response);
    };
    fetchTransactions();
  }, []);

  const formatBalance = (value) => {
    // Convierte el valor a cadena si es un número
    const stringValue = value.toString();
    // Divide en grupos de tres dígitos desde el final y agrega puntos
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderItem = ({ item }) => (
    <Link asChild href={`transaction/${item.id}`}>
      <StyledPressable className="active:opacity-70">
        <View style={styles.item}>
          <Text>Cuenta: {item.account.name}</Text>
          <Text>Monto: $ {formatBalance(item.amount)}</Text>
          <Text>Tipo: {item.type}</Text>
          <Text>Descripción: {item.description}</Text>
        </View>
      </StyledPressable>
    </Link>
  );

  return (
    <Screen>
      {transactions.length === 0 ? (
        <ActivityIndicator color={"#FF7D29"} size={"large"} />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View />}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: "#FFEEA9",
    borderRadius: 8,
  },
});
