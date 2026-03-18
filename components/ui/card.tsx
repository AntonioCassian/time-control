import React from "react"
import { View } from "react-native"

interface CardProps {
    children: React.ReactNode,
    className?: string
}

export const Card = ({ children, className }: CardProps) => {
    return(
        <>
        <View
                className={`p-4 mt-6 bg-white shadow-sm rounded-2xl ${className || ''}`}
                // style={{
                //   shadowColor: "#000",
                //   shadowOffset: { width: 0, height: 3 },
                //   shadowOpacity: 0.27,
                //   shadowRadius: 4.65,
                //   elevation: 6,
                // }}
                >
                    {children}
                </View>
        </>
    )
}