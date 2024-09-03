import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await api.post("/user/login", {
      email,
      password,
    });
    await saveSession(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const saveSession = async (data) => {
  await AsyncStorage.setItem("authToken", data.token);
  await AsyncStorage.setItem("userId", data.user.id);
};

export const getSession = async () => {
  return await AsyncStorage.getItem("userId");
};

export const clearSession = async () => {
  console.log("limpiando sesión");
  await AsyncStorage.removeItem("authToken");
  await AsyncStorage.removeItem("userId");
  console.log("sesión eliminada");
};

export const checkSession = async () => {
  const token = await AsyncStorage.getItem("authToken");
  console.log("token actual: ", token);
  return token !== null;
};
