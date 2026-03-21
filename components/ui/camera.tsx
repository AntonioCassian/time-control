import AntDesign from "@expo/vector-icons/AntDesign";
import Fontisto from "@expo/vector-icons/Fontisto";
import { CameraView } from "expo-camera";
import { Image } from "expo-image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Button, Modal, TouchableOpacity, View } from "react-native";

import { MyButton } from "./button";

type CameraProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  location: any;
};

type CameraFacing = "front" | "back";
type CameraFlash = "on" | "off" | "auto";

export const Camera = ({ setOpen, location }: CameraProps) => {
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraFlash, setCameraFlash] = useState<CameraFlash>("off");
  const [photoFile, setPhotoFile] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);

  const handleTakePicture = async () => {
    if (!cameraReady || !cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    if (photo) {
      setPhotoFile(photo.uri);
    }
  };

  const handleSend = async () => {
    if (!photoFile || !location) return;

    const formData = new FormData();

    formData.append("event_type", "entrada");
    formData.append("latitude", String(location.coords.latitude));
    formData.append("longitude", String(location.coords.longitude));

    formData.append("photo", {
      uri: photoFile,
      name: "photo.jpg",
      type: "image/jpeg",
    } as any);

    try {
      await fetch("https://SEU_BACKEND/api/time-records/clock", {
        method: "POST",
        body: formData,
      });

      setPhotoFile(null);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        ref={cameraRef}
        flash={cameraFlash}
        onCameraReady={() => setCameraReady(true)}
      >
        {/* TOPO */}
        <View className="flex-row justify-between p-4">
          <TouchableOpacity
            onPress={() =>
              setCameraFlash((prev) =>
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

      {/* PREVIEW */}
      {photoFile && (
        <Modal animationType="slide">
          <View className="justify-between flex-1 bg-black">
            <Image
              source={{ uri: photoFile }}
              style={{ width: "100%", height: "80%" }}
            />

            <View className="flex-row justify-between p-4">
              <Button title="Nova Foto" onPress={() => setPhotoFile(null)} />
              <MyButton title="Enviar Foto" onPress={handleSend} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};