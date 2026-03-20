import React, { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

type SkeletonItemProps = {
  width?: number;
  height?: number;
  borderRadius?: number;
};

export const SkeletonItem = ({
  width = 100,
  height = 20,
  borderRadius = 4,
}: SkeletonItemProps) => {
  const pulse = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [pulse]);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#E5E7EB",
        opacity: pulse,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3, // Android
      }}
    />
  );
};