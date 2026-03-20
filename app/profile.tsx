import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import { ScrollView, Switch, Text, View } from "react-native";

import { InfoItem } from "@/components/info_items";
import { useMe } from "@/mutations/useMe";
import { useAuth } from "@/providers/AuthProvider";

export default function Profile() {
    const { data, isLoading, error } = useMe(true);
    const { logout } = useAuth()

    const user = data;

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const initial = user.name.charAt(0).toUpperCase();
    if (!user) {
        return (
            <View className="flex-1 items-center justify-center bg-gray-100">
                <Text className="text-red-500">Erro ao carregar perfil</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            <ScrollView contentContainerStyle={{ padding: 16 }}>

                {/* Header */}
                {/* <Text className="mb-4 text-2xl font-bold text-gray-900">
                    Perfil
                </Text> */}

                {/* Avatar + Nome */}
                <View className="items-center rounded-xl bg-white p-6 shadow-sm">
                    <View className="h-20 w-20 items-center justify-center rounded-full bg-blue-500">
                        <Text className="text-2xl font-bold text-white">{initial}</Text>
                    </View>

                    <Text className="mt-3 text-xl font-bold text-gray-900">
                        {user?.name}
                    </Text>

                    <Text className="text-sm text-gray-500">
                        {user?.role}
                    </Text>
                </View>

                {/* Informações */}
                <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
                    <Text className="mb-3 text-sm font-bold uppercase text-gray-500">
                        Informações
                    </Text>

                    {/* <InfoItem icon="person" label="Nome" value={user?.name} loading={isLoading} />
<InfoItem icon="work" label="Cargo" value={user?.role} loading={isLoading} /> */}
                    <InfoItem icon="business" label="Departamento" value={user?.department} loading={isLoading} />
                    <InfoItem icon="email" label="Email" value={user?.email} loading={isLoading} />
                    <InfoItem icon="phone" label="Telefone" value={user?.phone} loading={isLoading} />
                    <InfoItem icon="place" label="Localização" value={user?.location} loading={isLoading} />
                </View>

                {/* Jornada */}
                <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
                    <Text className="mb-3 text-sm font-bold uppercase text-gray-500">
                        Jornada
                    </Text>

                    <InfoItem icon="schedule" label="Meta diária" value="8 horas" />
                    <InfoItem icon="date-range" label="Meta semanal" value="44 horas" />
                    <InfoItem icon="access-time" label="Horário padrão" value="08:00 - 18:00" />
                </View>

                {/* Configurações */}
                <View className="mt-4 rounded-xl bg-white p-4 shadow-sm">
                    <Text className="mb-3 text-sm font-bold uppercase text-gray-500">
                        Configurações
                    </Text>

                    {/* Notificações */}
                    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
                        <View className="flex-row items-center gap-2">
                            <MaterialIcons name="notifications" size={20} color="#374151" />
                            <Text className="text-base text-gray-700">
                                Notificações
                            </Text>
                        </View>

                        <Switch
                            value={notificationsEnabled}
                            onValueChange={setNotificationsEnabled}
                        />
                    </View>

                    {/* Política de Privacidade */}
                    <View
                        // onTouchEnd={() => router.push("/privacy")}
                        className="flex-row items-center justify-between py-3"
                    >
                        <View className="flex-row items-center gap-2">
                            <MaterialIcons name="privacy-tip" size={20} color="#374151" />
                            <Text className="text-base text-gray-700">
                                Política de Privacidade
                            </Text>
                        </View>

                        <MaterialIcons name="chevron-right" size={20} color="#9CA3AF" />
                    </View>
                </View>

                <View
                    // onTouchEnd={handleLogout}
                    onTouchEnd={logout}
                    className="mt-2 items-center justify-center rounded-xl bg-white py-4 shadow-sm"
                >
                    <Text className="text-base font-bold text-red-500">
                        Sair da conta
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}

