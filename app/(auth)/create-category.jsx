import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCategory } from "../../services/category.service";
import { Screen } from "../../components/Screen";
import { Stack } from "expo-router";

const schema = yup.object().shape({
  name: yup.string().required("El nombre es requerido"),
  type: yup.string().required("El balance es requerido"),
});

export default function CategoryCreate() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    alert("entro");
    await createCategory(data);
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FF7D29" },
          headerTintColor: "#FEFAE0",
          headerLeft: () => {},
          headerTitle: "Nueva categoría",
          headerRight: () => {},
        }}
      />

      <View style={styles.container}>
        <Text style={styles.label}>Nombre</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Universidad"
            />
          )}
        />
        {errors.name && (
          <Text style={styles.error}>{"El nombre es requerido"}</Text>
        )}

        <Text style={styles.label}>Tipo</Text>
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="INCOME"
            />
          )}
        />
        {errors.type && (
          <Text style={styles.error}>{"El tipo es requerido"}</Text>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-green-600 text-white font-bold px-4 rounded-full w-full py-3 mx-auto mt-10"
        >
          <Text className="text-center text-white text-sm font-semibold">
            Crear Categoria
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
});
