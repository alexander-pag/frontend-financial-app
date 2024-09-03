import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUser } from "../services/auth.service";
import { Link, router } from "expo-router";
import { Screen } from "../components/Screen";
import { useAuth } from "../context/authContext";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useAuth();

  const onSubmit = async (data) => {
    const loginSuccess = await loginUser(data);
    if (loginSuccess) {
      await login(loginSuccess.token);
      router.replace("/");
      alert("Sesión iniciada");
    } else {
      alert("Error en el inicio de sesión");
    }
  };

  return (
    <Screen style={styles.container}>
      <View>
        <Text className="text-2xl font-semibold mb-10  text-center">
          Inicia con tu cuenta
        </Text>
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
              defaultValue="alexandersimon7138@gmail.com"
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
              placeholder="********"
              defaultValue="Simoncito2024#"
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
          Iniciar Sesión
        </Text>
      </Pressable>

      <Link asChild href="/register">
        <Pressable className="mt-4">
          <Text className="text-center text-blue-600/80">
            ¿No tienes una cuenta? crea una aquí
          </Text>
        </Pressable>
      </Link>
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
