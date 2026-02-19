import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

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

  const handleLogin = () => {
    console.log("Login:", { email, password });
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    return router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 justify-center bg-red-600 px-6">
      <StatusBar barStyle="light-content" />

      <View className="rounded-3xl bg-white p-8 shadow-lg">
        {/* Logo / Título */}
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
            className="rounded-xl border border-gray-300 px-4 py-3"
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
            className="rounded-xl border border-gray-300 px-4 py-3"
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
          className="items-center rounded-xl bg-red-600 py-4"
        >
          <Text className="text-lg font-bold text-white">
            Entrar
          </Text>
        </TouchableOpacity>

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
