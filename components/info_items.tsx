import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, View } from "react-native";

import { SkeletonItem } from "./ui/skeleton";

type InfoItemProps = {
    icon: any;
    label: string;
    value?: string;
    loading?: boolean;
};

export const InfoItem = ({ icon, label, value, loading = false }: InfoItemProps) => (
    <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
        <View className="flex-row items-center gap-2">
            <MaterialIcons name={icon} size={20} color="#6B7280" />
            <Text className="text-gray-500">{label}</Text>
        </View>

        {loading ? <SkeletonItem width={120} height={20} /> : <Text className="font-medium text-gray-900">{value}</Text>}
    </View>
);