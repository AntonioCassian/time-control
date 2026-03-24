import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Header } from '@/components/header';
import { TimeCircle } from '@/components/time_aside';
import { Card } from '@/components/ui/card';
import { RecordToday } from '@/services/todayServices';

type Record = {
  id: number;
  event_type: string;
  created_at: string;
  hours?: number;
};

type ApiResponse = {
  data: Record[];
  expected_hours: number;
  next_event_type: string;
  worked_hours: number;
};

const HistoryItem = ({ label, time }: { label: string; time: string }) => (
  <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
    <Text className="text-base font-medium text-gray-700">{label}</Text>
    <Text className="text-base font-bold text-gray-900">{time}</Text>
  </View>
);

export default function Home() {
  const [records, setRecords] = useState<Record[]>([]);
  const [workedHours, setWorkedHours] = useState(0);
  const [expectedHours, setExpectedHours] = useState(8);
  const [nextEventType, setNextEventType] = useState('');

  const fetchRecords = async () => {
    try {
      const response: ApiResponse = await RecordToday();

      // pega corretamente os dados
      setRecords(response.data);
      setWorkedHours(response.worked_hours);
      setExpectedHours(response.expected_hours);
      setNextEventType(response.next_event_type);

    } catch (error) {
      console.log("Erro ao buscar histórico:", error);
    }
  };

  const addRecord = async (newRecord: Record) => {
    setRecords((prev) => [...prev, newRecord]);

    await fetchRecords();
  };

  useEffect(() => {
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
          <TimeCircle
            dailyGoal={expectedHours}
            workedHours={workedHours}
            nextEventType={nextEventType}
            addRecord={addRecord}
          />
        </View>

        {/* Histórico */}
        <Card>
          <Text className="mb-4 text-sm font-bold uppercase text-gray-500">
            Hoje
          </Text>

          {records?.length ? (
            records.map((record) => (
              <HistoryItem
                key={record.id}
                label={record.event_type}
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