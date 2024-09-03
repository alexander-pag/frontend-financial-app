import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getOneCategoryById } from "../../../services/category.service";
import { Screen } from "../../../components/Screen";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function EditCategory() {
  const { categoryId } = useLocalSearchParams();
  const [categoryInfo, setCategoryInfo] = useState(null);

  useEffect(() => {
    if (categoryId) {
      const fetchCategoryById = async (categoryId) => {
        const category = await getOneCategoryById(categoryId);
        setCategoryInfo(category);
      };

      fetchCategoryById(categoryId);
    }
  }, [categoryId]);

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
        {categoryInfo === null ? (
          <ActivityIndicator color={"#FF7D29"} size={"large"} />
        ) : (
          <View>
            <TextInput
              value={categoryInfo.name}
              onChangeText={(text) =>
                setCategoryInfo({ ...categoryInfo, name: text })
              }
              style={{
                borderColor: "#CCCCCC",
                borderWidth: 1,
                borderRadius: 10,
                padding: 10,
                marginBottom: 20,
                fontSize: 16,
              }}
              placeholder="Nombre de la categoría"
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
