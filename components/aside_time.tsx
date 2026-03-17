import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useCameraPermissions } from 'expo-camera';
import { useState } from "react";
import { Modal, Text, View } from "react-native"

import { LocationC } from "./location";
import { MyButton } from "./ui/button"
import { Camera } from "./ui/camera";

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
                <MyButton title="Pedir Permissão" onPress={requestPermission} />
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
                <View className="flex h-28 w-28 flex-row items-center justify-center rounded-full border-8 border-gray-600 text-center">
                    <Text className="text-foreground bottom-0 top-0 font-mono text-4xl font-bold leading-none tracking-tight text-black/50">
                        50 h
                    </Text>
                </View>

                <View className="flex-row items-center justify-center gap-1 p-2 mt-4 mb-4 bg-red-200 rounded-full min-w-[155px]">
                    <MaterialIcons size={18} name="history" color="#b91c1c" />
                    <Text className="text-sm font-semibold text-red-700">Proximo: Entrada</Text>
                </View>

            </View>

            <View className="mt-4">

                <MyButton title="Registrar Ponto" onPress={OpenCamera} />
            </View>
        </>
    )
}