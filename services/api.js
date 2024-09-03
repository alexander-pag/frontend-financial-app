// src/services/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Crear una instancia de axios
const api = axios.create({
  baseURL: "http://192.168.1.9:3000", // Cambia esto por la URL de tu backend
  timeout: 10000, // Tiempo de espera para las solicitudes
});

// Interceptor para agregar el token de autorización a cada solicitud
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores globalmente
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Puedes manejar diferentes tipos de errores aquí
    if (error.response && error.response.status === 401) {
      // Por ejemplo, redirigir al usuario al login si no está autorizado
      console.log("Usuario no autorizado, redirigiendo al login...");
    }
    return Promise.reject(error);
  }
);

export default api;
