import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { ActivityIndicator, Alert, Platform, Text, TouchableOpacity, View } from "react-native";

import { postClock } from "@/services/dot";

import { MyButton } from "./button";

type Record = {
  id: number;
  event_type: string;
  created_at: string;
  hours?: number;
};

type CameraProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  location: any;
  eventType: string;
  addRecord?: (record: Record) => void;
};

type CameraFacing = "front" | "back";
type CameraFlash = "on" | "off" | "auto";

export const Camera = ({ setOpen, location, eventType, addRecord }: CameraProps) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraFlash, setCameraFlash] = useState<CameraFlash>("off");
  const [photoFile, setPhotoFile] = useState<string | null>(null);
  const [cameraFacing, setCameraFacing] = useState<CameraFacing>("front");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ✅ novo estado

  const cameraRef = useRef<CameraView>(null);

  const handleTakePicture = async () => {
    if (!cameraReady || !cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    if (photo?.uri) setPhotoFile(photo.uri);
  };

  const capitalize = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  const capEventType = capitalize(eventType);

  const handleSend = async () => {

    if (!photoFile) {
      Alert.alert("❌ Sem foto");
      return;
    }

    if (!location?.coords) {
      console.log("❌ Sem localização", location);
      Alert.alert("Localização ainda não carregou");
      return;
    }
    if (!photoFile || !location?.coords) return;

    setIsLoading(true); // ✅ inicia loading

    const formData = new FormData();
    formData.append("event_type", capEventType);
    formData.append("latitude", String(location.coords.latitude));
    formData.append("longitude", String(location.coords.longitude));

    if (Platform.OS === "web") {
      const photoResponse = await fetch(photoFile);
      const photoBlob = await photoResponse.blob();
      formData.append("photo", photoBlob, "photo.jpg");
    } else {
      formData.append("photo", {
        uri: photoFile,
        name: "photo.jpg",
        type: "image/jpeg",
      } as any);
    }

    try {
      const result = await postClock(formData);
      console.log("Enviado com sucesso:", result);

      if (addRecord) {
        addRecord({
          id: result.id,
          event_type: capitalize(result.event_type), // ✅ primeira letra maiúscula
          created_at: result.created_at,
          hours: 0,
        });
      }

      setPhotoFile(null);
      setShowConfirmation(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // ✅ termina loading
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showConfirmation ? (
        <View className="flex-1 items-center justify-center bg-white px-6">
          <Text className="mb-4 text-2xl font-bold">✅ Foto enviada com sucesso!</Text>
          <MyButton
            title="Voltar"
            className="rounded-lg bg-blue-500 px-6 py-3 font-bold text-white"
            onPress={() => {
              setShowConfirmation(false);
              setOpen(false);
            }}
          />
        </View>
      ) : photoFile ? (
        <View className="flex-1 justify-between bg-black">
          <Image source={{ uri: photoFile }} style={{ width: "100%", height: "80%" }} />
          <View className="flex-row justify-between p-4">
            <MyButton title="Nova Foto" onPress={() => setPhotoFile(null)} />
            <MyButton
              title="Enviar Foto"
              onPress={handleSend}
              disabled={isLoading}
            />
            {isLoading && (
              <View className="absolute inset-0 items-center justify-center bg-black bg-opacity-50">
                <ActivityIndicator size="large" color="#fff" />
              </View>
            )}
          </View>
        </View>
      ) : (
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
          facing={cameraFacing}
          flash={cameraFlash}
          onCameraReady={() => setCameraReady(true)}
        >
          <View className="flex-row justify-between p-4">
            <TouchableOpacity
              onPress={() =>
                setCameraFlash(prev =>
                  prev === "off" ? "on" : prev === "on" ? "auto" : "off"
                )
              }
            >
              <Fontisto name="flash" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOpen(false)}>
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <View className="absolute bottom-10 w-full flex-row justify-center">
            <TouchableOpacity onPress={handleTakePicture}>
              <View className="border-[6px] h-24 w-24 rounded-full border-white p-2">
                <View className="flex-1 rounded-full bg-white" />
              </View>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};