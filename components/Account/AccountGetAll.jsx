import { useEffect, useState } from "react";
import { getAllAccounts } from "../../services/account.service";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Screen } from "../Screen";
import { Link } from "expo-router";
import { styled } from "nativewind";

const StyledPressable = styled(Pressable);

export default function AccountGetAll() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const response = await getAllAccounts();
      setAccounts(response);
    };
    fetchAccounts();
  }, []);

  const formatBalance = (value) => {
    // Convierte el valor a cadena si es un número
    const stringValue = value.toString();
    // Divide en grupos de tres dígitos desde el final y agrega puntos
    return stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const renderItem = ({ item }) => (
    <Link asChild href={`account/${item.id}`}>
      <StyledPressable className="active:opacity-70">
        <View style={styles.item}>
          <Text>Nombre: {item.name}</Text>
          <Text>Balance: $ {formatBalance(item.balance)}</Text>
          <Text>Usuario: {item.user.name}</Text>
        </View>
      </StyledPressable>
    </Link>
  );

  return (
    <Screen>
      {accounts.length === 0 ? (
        <ActivityIndicator color={"#FF7D29"} size={"large"} />
      ) : (
        <FlatList
          data={accounts}
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
