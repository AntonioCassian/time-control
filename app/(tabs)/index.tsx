import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Header } from '@/components/header';
import { TimeCircle } from '@/components/time_aside';
import { Card } from '@/components/ui/card';
import { TimeRecordsMe } from '@/services/timerecors-me';

const HistoryItem = ({ label, time }: { label: string; time: string }) => (
  <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
    <Text className="text-base font-medium text-gray-700">{label}</Text>
    <Text className="text-base font-bold text-gray-900">{time}</Text>
  </View>
);

export default function Home() {
  const [records, setRecords] = useState<any[]>([]);

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0]; // "2026-03-22"

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await TimeRecordsMe();

        // Filtra registros do dia atual
        const todayRecords = data.filter((item: any) => {
          const recordDate = item.created_at.split('T')[0]; // Pega "YYYY-MM-DD"
          return recordDate === todayStr;
        });

        setRecords(todayRecords);
      } catch (error) {
        console.log("Erro ao buscar histórico:", error);
      }
    };

    fetchRecords();
  }, []);

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
          <TimeCircle hours={32} goal={44} />
        </View>

        {/* Histórico */}
        <Card>
          <Text className="mb-4 text-sm font-bold text-gray-500 uppercase">
            Hoje
          </Text>

          {records.length > 0 ? (
            records.map((record) => (
              <HistoryItem
                key={record.id}
                label={record.event_type} // agora pega o tipo do evento
                time={new Date(record.created_at).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              />
            ))
          ) : (
            <Text className="py-4 text-center text-gray-400">
              Não há registros hoje
            </Text>
          )}
        </Card>
      </ScrollView>
    </View>
  );
}