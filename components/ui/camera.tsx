import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Platform,Text, TouchableOpacity, View } from "react-native";

import { postClock } from "@/services/dot";

import { MyButton } from "./button";

type Record = {
  id: number;
  event_type: string;
  created_at: string;
  hours?: number;
};

type CameraProps = {
  setOpen: Dispatch<SetStateAction<boolean>>; // controla modal da câmera
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

  const cameraRef = useRef<CameraView>(null);

  const handleTakePicture = async () => {
    if (!cameraReady || !cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    if (photo?.uri) setPhotoFile(photo.uri);
  };

  const handleSend = async () => {
    if (!photoFile || !location) return;

    const formData = new FormData();
    formData.append("event_type", eventType);
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

      addRecord?.({
        id: new Date().getTime(),
        event_type: result.event_type,
        created_at: new Date().toISOString(),
        hours: 0,
      });

      setPhotoFile(null);
      setShowConfirmation(true); // mostra confirmação
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {showConfirmation ? (
        // TELA DE CONFIRMAÇÃO
        <View className="items-center justify-center flex-1 px-6 bg-white">
          <Text className="mb-4 text-2xl font-bold">✅ Foto enviada com sucesso!</Text>
          <MyButton
            title="Voltar"
            className="px-6 py-3 font-bold text-white bg-blue-500 rounded-lg"
            onPress={() => {
              // Fecha modal da câmera, volta pra tela index
              setShowConfirmation(false);
              setOpen(false);
            }}
          />
        </View>
      ) : photoFile ? (
        // PREVIEW DA FOTO
        <View className="justify-between flex-1 bg-black">
          <Image source={{ uri: photoFile }} style={{ width: "100%", height: "80%" }} />
          <View className="flex-row justify-between p-4">
            <MyButton title="Nova Foto" onPress={() => setPhotoFile(null)} />
            <MyButton title="Enviar Foto" onPress={handleSend} />
          </View>
        </View>
      ) : (
        // CÂMERA
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
          facing={cameraFacing}
          flash={cameraFlash}
          onCameraReady={() => setCameraReady(true)}
        >
          {/* TOPO */}
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

          {/* BOTÃO FOTO */}
          <View className="absolute flex-row justify-center w-full bottom-10">
            <TouchableOpacity onPress={handleTakePicture}>
              <View className="border-[6px] h-24 w-24 rounded-full border-white p-2">
                <View className="flex-1 bg-white rounded-full" />
              </View>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
};