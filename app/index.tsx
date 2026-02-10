import { Link } from "expo-router";

import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
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
    </View>
  );
}
