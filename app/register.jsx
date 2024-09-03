import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "expo-router";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text className="text-2xl font-semibold mb-10  text-center">
          Crea tu cuenta
        </Text>
      </View>

      <View>
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
      </View>

      <View>
        <Text style={styles.label}>Correo</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              placeholder="alexandersimon7138@gmail.com"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.error}>{"El correo es requerido"}</Text>
        )}
      </View>

      <View>
        <Text style={styles.label}>Contraseña</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholder="********"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.error}>{"La contraseña es requerida"}</Text>
        )}
      </View>

      <Pressable
        onPress={handleSubmit(onSubmit)}
        className="bg-[#FF7D29] text-white font-bold px-4 rounded-full w-full py-3 mx-auto mt-10"
      >
        <Text className="text-center text-white text-sm font-semibold">
          Crear Cuenta
        </Text>
      </Pressable>

      <Link asChild href="/login">
        <Pressable className="mt-4">
          <Text className="text-center text-blue-600/80">
            ¿Ya tienes una cuenta? inicia aquí
          </Text>
        </Pressable>
      </Link>
    </View>
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
