import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useRouter } from "expo-router";
import { useState } from "react";
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const router = useRouter();
  // const [location, setLocation] = useState<Location.LocationObject | null>(null);
  // const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // useEffect(() => {
  //   async function getCurrentLocation() {

  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   }

  //   getCurrentLocation();
  // }, []);

  // let text = 'Waiting...';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    // Reset erros anteriores
    setEmailError("");
    setPasswordError("");

    let hasError = false;
    if (!email) {
      setEmailError("Email é obrigatório");
      hasError = true;
    }
    if (!password) {
      setPasswordError("Senha é obrigatória");
      hasError = true;
    }

    if (hasError) return;

    try {
      await login(email, password);
    } catch (err: any) {
      if (err.message.toLowerCase().includes("email")) {
        setEmailError(err.message);
      } else if (err.message.toLowerCase().includes("senha")) {
        setPasswordError(err.message);
      } else {
        // erro genérico
        setPasswordError(err.message || "Erro ao fazer login");
      }
    }
  };

  return (
    <View className="flex-1 justify-center bg-blue-600 px-6">
      <StatusBar barStyle="light-content" />

      <View className="rounded-3xl bg-white p-8 shadow-lg">
        <View className="mb-8 items-center">
          <Text className="text-3xl font-bold text-gray-800">
            <AntDesign name="clock-circle" size={24} color="black" /> time-control
          </Text>
          <Text className="mt-2 text-center text-gray-500">
            Controle seu ponto com facilidade
          </Text>
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="mb-2 text-gray-700">Email</Text>
          <TextInput
            className="rounded-xl border border-gray-300 px-4 py-3 text-gray-900"
            placeholder="Digite seu email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
          />
          {emailError ? (
            <Text className="mt-1 text-sm text-red-500">{emailError}</Text>
          ) : null}
        </View>

        {/* Senha */}
        <View className="mb-6">
          <Text className="mb-2 text-gray-700">Senha</Text>
          <TextInput
            className="rounded-xl border border-gray-300 px-4 py-3 text-gray-900"
            placeholder="Digite sua senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? (
            <Text className="mt-1 text-sm text-red-500">{passwordError}</Text>
          ) : null}
        </View>

        {/* Botão */}

        <TouchableOpacity
          onPress={handleLogin}
          className="items-center rounded-xl bg-blue-600 py-4"
          disabled={isLoading}
        >
          <Text className="text-lg font-bold text-white">
            {isLoading ? 'Carregando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        {/* Exibe erro abaixo do botão */}
        {error ? (
          <Text className="mt-2 text-center text-sm text-red-500">
            {error}
          </Text>
        ) : null}

        {/* Footer */}
        <View className="mt-6 items-center">
          <Text className="text-gray-500">
            Esqueceu a senha?
          </Text>
        </View>
      </View>
    </View>

  );
}
