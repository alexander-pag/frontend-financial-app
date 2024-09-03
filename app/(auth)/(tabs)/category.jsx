import { View, Pressable, Text } from "react-native";
import CategoryGetAll from "../../../components/Category/CategoryGetAll";
import { Link } from "expo-router";

export default function Category() {
  return (
    <>
      <View className="bg-[#FEFFD2] pt-3 px-7">
        <View className="flex-row justify-between items-center">
          <Text className="font-semibold text-xl">Categorías</Text>
          <Link asChild href="/create-category">
            <Pressable className="bg-green-700 text-white font-bold py-3 px-4 rounded-full w-24">
              <Text className="text-center text-white text-sm font-semibold">
                Añadir
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>

      <CategoryGetAll />
    </>
  );
}
