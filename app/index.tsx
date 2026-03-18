import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";

import { useAuth } from "@/contexts/AuthContext";
import { useLoginMutation } from "@/mutations/useLoginMutation";

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
  const { login, isLoading } = useAuth();

  const handleLogin = () => login(email, password);


  // const handleLogin = async () => {
  //   if (!email || !password) {
  //     alert("Preencha todos os campos");
  //     return;
  //   }
  //   setIsLoading(true)

  //   try {
  //     const result = await mutate({ email, password });
  //     console.log("Login bem-sucedido", result);
  //     await AsyncStorage.setItem("token", result.token);
  //     router.replace("/(tabs)");
  //   } catch (err: any) {
  //     alert("Erro no login: " + err.message);
  //     setIsLoading(false)
  //   }
  // };

  // console.log("data", data); // aqui o valor inicial é undefined até a mutation completar

  // console.log('data', data)

  return (
    <View className="justify-center flex-1 px-6 bg-red-600">
      <StatusBar barStyle="light-content" />

      <View className="p-8 bg-white shadow-lg rounded-3xl">
        {/* Logo / Título */}
        <View className="items-center mb-8">
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
            className="px-4 py-3 border border-gray-300 rounded-xl"
            placeholder="Digite seu email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Senha */}
        <View className="mb-6">
          <Text className="mb-2 text-gray-700">Senha</Text>
          <TextInput
            className="px-4 py-3 border border-gray-300 rounded-xl"
            placeholder="Digite sua senha"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Botão */}
        <TouchableOpacity
          onPress={handleLogin}
          className="items-center py-4 bg-red-600 rounded-xl"
        >
          {isLoading ?
            <Text className="text-lg font-bold text-white">
              Carregando...
            </Text>
            :
            <Text>
              Entrar
            </Text>
          }
        </TouchableOpacity>

        {/* Footer */}
        <View className="items-center mt-6">
          <Text className="text-gray-500">
            Esqueceu a senha?
          </Text>
        </View>
      </View>
    </View>

  );
}
