import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Alert, Linking } from "react-native";

export const useLocation = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getLocation = async () => {
    try {
      setLoading(true);

      // 🔍 Verifica se GPS está ligado
      const enabled = await Location.hasServicesEnabledAsync();

      if (!enabled) {
        setErrorMsg("GPS desativado. Ative sua localização.");
        setLoading(false);
        return;
      }

      // 🔐 Permissão
      const { status, canAskAgain } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        if (!canAskAgain) {
          Alert.alert(
            "Permissão bloqueada",
            "Ative a localização nas configurações",
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

        setLoading(false);
        return;
      }

      // 📍 Pega localização
      const current = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(current);
      setErrorMsg(null);
    } catch (err) {
      setErrorMsg("Erro ao obter localização");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    location,
    errorMsg,
    loading,
    refreshLocation: getLocation,
  };
};