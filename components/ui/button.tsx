import { Text, TouchableOpacity } from "react-native"

interface  ButtonProps{
    title: string;
    onPress?: () => void;
}

export const MyButton = ({title, onPress}: ButtonProps) => {
    return (
        <>
            <TouchableOpacity style={{
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.20,
                shadowRadius: 5.62,
                elevation: 7
            }} className="bg-blue-600 !rounded-full p-4 items-center"
            onPress={onPress}>
                <Text className="text-lg font-bold text-white">{title}</Text>
            </TouchableOpacity>
        </>
    )
}