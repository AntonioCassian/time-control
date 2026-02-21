import AntDesign from '@expo/vector-icons/AntDesign';
import { Dispatch, SetStateAction, useRef, useState } from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import { BarcodeScanningResult, CameraView } from "expo-camera"
import { Button, Modal, Text, TouchableOpacity, View } from "react-native"
import { MyButton as MyButton } from "./button"
import { Image } from "expo-image";

type CameraProps = {
    setOpen: Dispatch<SetStateAction<boolean>>;
};

type CameraFacing = "front" | "back";
type CameraFlash = "on" | "off" | "auto";

export const Camera = ({ setOpen }: CameraProps) => {
    const [cameraReady, setCameraReady] = useState(false);
    const [cameraFlash, setCameraFlash] = useState<CameraFlash>("off")
    const [cameraFacing, setCameraFacing] = useState<CameraFacing>("front");
    const [qrResult, setQrResult] = useState('');
    const [photoFile, setPhotoFile] = useState<string | null>(null)
    const [cameraZoom, setCameraZoom] = useState<number>(0);

    const cameraRef = useRef<CameraView>(null);

    const handleCameraFacing = () => {
        if (cameraFacing === 'front') {
            setCameraFacing("back")
        } else {
            setCameraFacing("front")
        }
    }

    const handleCameraFlash = () => {
        switch (cameraFlash) {
            case 'off':
                setCameraFlash('on');
                break;
            case 'on':
                setCameraFlash('auto');
                break;
            case 'auto':
                setCameraFlash('off');
                break;
        }
    }

    const handleBarCode = (result: BarcodeScanningResult) => {
        setQrResult(result.data)
    }

    const handleCameraReady = () => {
        setCameraReady(true)
    }

    const handleTakePicture = async () => {
        if (cameraReady && cameraRef.current) {
            const options = {
                quality: 0.7,
                base64: true
            };
            const photo = await cameraRef.current.takePictureAsync(options);
            if (photo) {
                setPhotoFile(photo.uri);
            }

            //photo.base64 pra emviar pra api
        }
    }

    return (
        <View style={{ width: '100%', height: "100%" }} className="top fixed">
            <CameraView style={{ flex: 1, position: 'relative', width: '100%' }}
                ref={cameraRef}
                facing={cameraFacing}
                flash={cameraFlash}
                // onBarcodeScanned={handleBarCode}
                // zoom={cameraZoom}
                onCameraReady={handleCameraReady}
            >
                {/* <Button title="Fechar" onPress={() => setOpen(false)} /> */}
                <View className='flex flex-row justify-between p-2 pt-4'>
                    <View >
                        <TouchableOpacity onPress={handleCameraFlash}>
                            <Fontisto name="flash" size={24} color="black" />
                        </TouchableOpacity>

                        <Text>{cameraFlash}</Text>
                    </View>

                    <TouchableOpacity onPress={() => setOpen(false)}>
                        <AntDesign name="close" size={24} color="black" />
                    </TouchableOpacity>
                </View>


                {/* <View>
                    <Button title="Virar Camera" onPress={handleCameraFacing} />
                </View>
                <View>
                    <Text>QR: {qrResult}</Text>
                </View>
                <View className='flex flex-row justify-around'>
                    <Button title='0%' onPress={() => setCameraZoom(0)} />
                    <Button title='25%' onPress={() => setCameraZoom(0.25)} />
                    <Button title='50%' onPress={() => setCameraZoom(0.5)} />
                    <Button title='75%' onPress={() => setCameraZoom(0.75)} />
                    <Button title='100%' onPress={() => setCameraZoom(1)} />
                </View> */}
                <View className='absolute bottom-2 w-full flex-row items-center justify-between p-2'>
                    <View className=''><Button title="Fechar" onPress={() => setOpen(false)} /></View>
                    <TouchableOpacity className='' onPress={handleTakePicture} >
                        <View className="border-[6px] h-24 w-24 flex-row items-center justify-center rounded-full border-gray-50 p-3">
                            <View className="h-full w-full rounded-full bg-gray-50">

                            </View>
                        </View>
                    </TouchableOpacity>
                    <View className='w-[70px]'>
                        
                    </View>
                </View>
            </CameraView>

            {/* <View>
                <MyButton title="Tirar Foto" onPress={handleTakePicture} />
            </View> */}
            {photoFile &&
                <Modal animationType="slide" transparent={false} className='flex-1'>
                    <View className='relative flex-1 flex-col items-center justify-between bg-black py-24'>
                        <Image source={{ uri: photoFile }} className="!relative " style={{ width: '100%', height: "100%", position: "relative" }} />
                        <View className='absolute bottom-3 z-50 w-full flex-1 flex-row justify-between'>
                            <Button title="Nova Foto" />
                            <MyButton title="Enviar Foto" />
                        </View>
                    </View>
                </Modal>
            }
        </View>
    )
}
