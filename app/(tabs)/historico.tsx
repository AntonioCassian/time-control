import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { Card } from "@/components/ui/card";
import { TimeRecordsMe } from '@/services/timerecors-me';

export default function Historico() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mesAtual, setMesAtual] = useState(new Date());

  // 🔹 Buscar dados
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const data = await TimeRecordsMe();
        setRecords(data);
      } catch (error) {
        console.log("Erro ao buscar histórico:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // 🔹 Navegação mês
  const proximoMes = () => {
    const novo = new Date(mesAtual);
    novo.setMonth(novo.getMonth() + 1);

    if (novo > new Date()) return;

    setMesAtual(novo);
  };

  const mesAnterior = () => {
    const novo = new Date(mesAtual);
    novo.setMonth(novo.getMonth() - 1);
    setMesAtual(novo);
  };

  const nomeMes = mesAtual.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  // 🔹 Agrupar por data
  const agruparPorData = (records: any[]) => {
    const grouped: Record<string, any[]> = {};

    records.forEach((item) => {
      const data = new Date(item.recorded_at).toISOString().split("T")[0];

      if (!grouped[data]) grouped[data] = [];

      grouped[data].push(item);
    });

    return grouped;
  };

  // 🔹 Calcular horas
  const calcularHoras = (registros: any[]) => {
    let totalMs = 0;

    for (let i = 0; i < registros.length; i += 2) {
      const entrada = registros[i];
      const saida = registros[i + 1];

      if (entrada && saida) {
        const inicio = new Date(entrada.recorded_at).getTime();
        const fim = new Date(saida.recorded_at).getTime();
        totalMs += fim - inicio;
      }
    }

    const horas = Math.floor(totalMs / 1000 / 60 / 60);
    const minutos = Math.floor((totalMs / 1000 / 60) % 60);

    return { horas, minutos, totalMs };
  };

  // 🔹 Formatar dados
  const formatarDados = (records: any[]) => {
    const grouped = agruparPorData(records);

    return Object.keys(grouped).map((data) => {
      const registros = grouped[data].sort(
        (a, b) =>
          new Date(a.recorded_at).getTime() -
          new Date(b.recorded_at).getTime()
      );

      const horasDia = calcularHoras(registros);

      return {
        data,
        registros,
        horasDia,
      };
    });
  };

  const formatarHora = (date: string) => {
    return new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // 🔹 Filtrar por mês
  const registrosFiltrados = records.filter((item) => {
    const data = new Date(item.recorded_at);

    return (
      data.getMonth() === mesAtual.getMonth() &&
      data.getFullYear() === mesAtual.getFullYear()
    );
  });

  const dias = formatarDados(registrosFiltrados);

  // 🔹 Totais do mês
  const totalMsMes = dias.reduce((acc, dia) => acc + dia.horasDia.totalMs, 0);

  const totalHorasMes = Math.floor(totalMsMes / 1000 / 60 / 60);
  const totalMinMes = Math.floor((totalMsMes / 1000 / 60) % 60);

  const diasTrabalhados = dias.length;

  return (
    <ScrollView
      className="flex-1 bg-gray-100"
      contentContainerStyle={{ padding: 16, paddingTop: 24 }}
      showsVerticalScrollIndicator={false}
    >

      {/* Header mês */}
      <View className="flex-row items-center justify-between mb-4">
        <TouchableOpacity
          onPress={mesAnterior}
          className="p-2 bg-white rounded-full shadow-sm"
        >
          <MaterialIcons name="keyboard-arrow-left" size={22} color="#374151" />
        </TouchableOpacity>

        <Text className="text-lg font-bold text-gray-800 capitalize">
          {nomeMes}
        </Text>

        <TouchableOpacity
          onPress={proximoMes}
          className="p-2 bg-white rounded-full shadow-sm"
        >
          <MaterialIcons name="keyboard-arrow-right" size={22} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Resumo */}
      <Card className="p-4 mb-6 bg-white shadow-sm rounded-2xl">
        <View className="flex-row items-center gap-3">
          <View className="items-center justify-center w-12 h-12 bg-blue-500 rounded-full">
            <MaterialIcons size={22} name="insights" color="#fff" />
          </View>

          <View className="flex-row justify-between flex-1">
            <View>
              <Text className="text-xs text-gray-500">Total do mês</Text>
              <Text className="text-xl font-bold text-gray-800">
                {loading
                  ? "..."
                  : `${totalHorasMes}h${String(totalMinMes).padStart(2, "0")}`}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-xs text-gray-500">Dias trabalhados</Text>
              <Text className="text-xl font-bold text-gray-800">
                {loading ? "..." : diasTrabalhados}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      {/* Registros */}
      <View>
        <Text className="text-sm font-bold tracking-wide text-gray-500 uppercase">
          Registros
        </Text>

        {/* Loading */}
        {loading && (
          <Text className="mt-4 text-gray-500">Carregando...</Text>
        )}

        {/* Estado vazio */}
        {!loading && dias.length === 0 && (
          <View className="items-center justify-center py-10">
            <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />

            <Text className="mt-4 text-base font-semibold text-gray-500">
              Nenhum registro encontrado
            </Text>

            <Text className="mt-1 text-sm text-gray-400">
              Não há registros para este mês
            </Text>
          </View>
        )}

        {/* Lista */}
        {dias.map((dia, index) => {
          const { horas, minutos } = dia.horasDia;

          return (
            <Card key={index} className="p-4 mb-3 bg-white shadow-sm rounded-2xl">

              <View className="flex-row items-center justify-between mb-3">
                <Text className="font-semibold text-gray-800">
                  {new Date(dia.data).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>

                <View className="px-2 py-1 bg-blue-100 rounded-full">
                  <Text className="text-xs font-semibold text-blue-600">
                    {`${horas}h${String(minutos).padStart(2, "0")}`}
                  </Text>
                </View>
              </View>

              <View className="gap-3">
                {dia.registros.map((item, i) => (
                  <View key={i} className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-3">
                      <View
                        className={`items-center justify-center w-10 h-10 rounded-full ${
                          item.event_type === "entrada"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        <Ionicons
                          name={
                            item.event_type === "entrada"
                              ? "enter-outline"
                              : "exit-outline"
                          }
                          size={18}
                          color={item.event_type === "entrada" ? "green" : "red"}
                        />
                      </View>

                      <Text className="text-gray-700 capitalize">
                        {item.event_type}
                      </Text>
                    </View>

                    <Text className="font-semibold text-gray-800">
                      {formatarHora(item.recorded_at)}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          );
        })}
      </View>
    </ScrollView>
  );
}