import { AsideTime } from '@/components/aside_time'
import { Header } from '@/components/header'
import { Card } from '@/components/ui/card'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { View, Text } from 'react-native'

export default function Home() {
  return (
    <View className="flex-1 bg-gray-400 p-4">
      <Header />

      <Card>
        <AsideTime />
      </Card>

      <View>
        <Text className="mb-2 text-base !text-[##6b7280] uppercase font-bold">Hoje</Text>

        <View className="flex-row items-center justify-between p-4 bg-white border-b-2 border-[#e5e7eb] rounded-xl"
        //       style={{
        //   borderBottomWidth: index === items.length - 1 ? 0 : 1,
        // }} 
        >

          <View className="flex-row items-center justify-center gap-2">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-slate-400">
              <MaterialIcons size={18} name="history" color="#ffffff" />
            </View>

            <Text className="text-lg font-bold text-[#282c34]">Entrada</Text>
          </View>
          <View>
            <Text className="text-lg font-bold text-[#282c34]">08:00</Text>
          </View>
        </View>
      </View>
    </View >
  )
}
