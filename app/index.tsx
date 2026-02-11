import { Link } from "expo-router";
import { useEffect, useState } from "react";
import * as Location from 'expo-location';
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function getCurrentLocation() {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Link href={'/'}>aaaa</Link>
      <Link href="/(tabs)/index">
      <Text className="text-lg font-bold text-center text-red-900">Go to Home Tab</Text>
        <TouchableOpacity className="p-4 m-4 bg-red-600 rounded-lg">
          <Text className="text-lg font-bold text-center text-white">Go to Home Tab</Text>
        </TouchableOpacity>
      </Link>
      <View className="flex-1 bg-red-400">

      </View>
      <View>
      <Text>{text}</Text>
    </View>
    </View>
  );
}
