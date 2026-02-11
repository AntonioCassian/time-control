import { Modal, Text, View } from "react-native"
import { Button } from "./ui/button"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useCameraPermissions } from 'expo-camera';
import { useState } from "react";
import { Camera } from "./ui/camera";
import { LocationC } from "./location";

export const AsideTime = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [open, setOpen] = useState(false);


    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View>
                <Text>Você precisa dar permssão para exibir a camêra!</Text>
                <Button title="Pedir Permissão" onPress={requestPermission} />
            </View>
        )
    }

    const OpenCamera = () => {
        setOpen(true);
    }

    return (
        <>
            <Modal visible={open} animationType="slide">
                <Camera setOpen={setOpen} />
            </Modal>
            <View className="flex-col items-center gap-4">
                <View>

                    <Text className="text-sm text-gray-600">Terça Feira, 23 de Dezembro</Text>
                    <LocationC />
                </View>
                <View>
                    <Text className="font-mono text-4xl font-bold tracking-tight text-foreground text-black/50">
                        00:57:28
                    </Text>
                </View>

                <View className="flex-row items-center justify-center gap-1 p-2 mt-4 mb-4 bg-red-200 rounded-full min-w-[155px]">
                    <MaterialIcons size={18} name="history" color="#b91c1c" />
                    <Text className="text-sm font-semibold text-red-700">Proximo: Entrada</Text>
                </View>

            </View>

            <View className="mt-4">

                <Button title="Registrar Ponto" onPress={OpenCamera} />
            </View>
        </>
    )
}