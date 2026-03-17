import axios from "axios";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

// api.interceptors.request.use((config) => {
//   const token = "";
//   if (token && config.headers) {
//     config.headers["Authorization"] = `Bearer ${token}`;
//   }
//   return config;
// });