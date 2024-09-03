import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAccount } from "../../services/account.service";
import { Screen } from "../../components/Screen";
import { Stack } from "expo-router";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  balance: yup.string().required("El balance es requerido"),
});

export default function AccountCreate() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const formatBalance = (value) => {
    // Elimina cualquier punto existente para no interferir con el nuevo formateo
    const cleanValue = value.replace(/\./g, "");

    // Divide en grupos de tres dígitos desde el final
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const onSubmit = async (data) => {
    alert("entro");
    // Eliminar los puntos antes de enviar el balance al backend
    const formattedData = {
      ...data,
      balance: data.balance.replace(/\./g, ""),
    };
    await createAccount(formattedData);
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: "#FF7D29" },
          headerTintColor: "#FEFAE0",
          headerLeft: () => {},
          headerTitle: "Nueva cuenta",
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
              placeholder="Simon"
            />
          )}
        />
        {errors.name && (
          <Text style={styles.error}>{"El nombre es requerido"}</Text>
        )}

        <Text style={styles.label}>Balance</Text>
        <Controller
          control={control}
          name="balance"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatBalance(text))}
              value={value}
              placeholder="15000"
              keyboardType="numeric"
            />
          )}
        />
        {errors.balance && (
          <Text style={styles.error}>{"El balance es requerido"}</Text>
        )}

        <Pressable
          onPress={handleSubmit(onSubmit)}
          className="bg-green-600 text-white font-bold px-4 rounded-full w-full py-3 mx-auto mt-10"
        >
          <Text className="text-center text-white text-sm font-semibold">
            Crear Cuenta
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
