import { useEffect, useState } from "react";
import { getAllCategories } from "../../services/category.service";
import { Screen } from "../Screen";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { styled } from "nativewind";
import { Link } from "expo-router";

const StyledPressable = styled(Pressable);

export default function CategoryGetAll() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getAllCategories();
      setCategories(response);
    };
    fetchCategories();
  }, []);

  const renderItem = ({ item }) => (
    <Link asChild href={`category/${item.id}`}>
      <StyledPressable className="active:opacity-70">
        <View style={styles.item}>
          <Text>Nombre: {item.name}</Text>
          <Text>Tipo: {item.type}</Text>
          <Text>Usuario: {item.user.name}</Text>
        </View>
      </StyledPressable>
    </Link>
  );

  return (
    <Screen>
      {categories.length === 0 ? (
        <ActivityIndicator color={"#FF7D29"} size={"large"} />
      ) : (
        <FlatList
          data={categories}
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
