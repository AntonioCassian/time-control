import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ScrollView, Text,View } from 'react-native'

import { AsideTime } from '@/components/aside_time'
import { Header } from '@/components/header'
import { TimeCircle } from '@/components/time_aside'
import { Card } from '@/components/ui/card'

const HistoryItem = ({ label, time }: { label: string; time: string }) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
    <Text className="text-base font-medium text-gray-700">{label}</Text>
    <Text className="text-base font-bold text-gray-900">{time}</Text>
  </View>
);

export default function Home() {
  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <Header />

        {/* Card principal */}
        <View className="mt-4">
          <TimeCircle hours={50} goal={100} />
        </View>

        {/* Histórico */}
        <Card >
          <Text className="mb-4 text-sm font-bold text-gray-500 uppercase">
            Hoje
          </Text>

          <HistoryItem label="Entrada" time="08:00" />
          <HistoryItem label="Saída" time="12:00" />
          <HistoryItem label="Retorno" time="13:00" />
          <HistoryItem label="Saída" time="18:00" />
        </Card>
      </ScrollView>
    </View>
  );
}