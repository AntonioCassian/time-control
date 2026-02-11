import { useState } from "react";
import * as Location from "expo-location";
import { Text, View, Button, Alert, Linking } from "react-native";

export const LocationC = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    async function getLocation() {
        let { status, canAskAgain } =
            await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            if (!canAskAgain) {
                // Permissão bloqueada permanentemente
                Alert.alert(
                    "Permissão bloqueada",
                    "Você precisa ativar a localização nas configurações do app.",
                    [
                        { text: "Cancelar", style: "cancel" },
                        {
                            text: "Abrir Configurações",
                            onPress: () => Linking.openSettings(),
                        },
                    ]
                );
            } else {
                setErrorMsg("Permissão de localização negada");
            }
            return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setErrorMsg(null);
    }

    let text = "Clique para obter localização";

    if (errorMsg) text = errorMsg;

    if (location) {
        text = `Latitude: ${location.coords.latitude}
Longitude: ${location.coords.longitude}`;
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ marginBottom: 10 }}>{text}</Text>
            {!location &&

                <Button title="Obter Localização" onPress={getLocation} />
            }
        </View>
    );
};
