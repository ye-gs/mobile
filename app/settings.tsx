import React from "react";
import { View, Text } from "@/components/Themed";
import { useTheme } from "@/contexts/theme";
import { TheamCard } from "@/components/TheamCard";
import { GestureResponderEvent } from "react-native";
import { ThemeNames } from "@/constants/Colors";

export default function UserInfo() {
    const { theme, setTheme } = useTheme(); // Destructure setTheme from useTheme

    // Handler to update theme
    const handleThemeChange = (
        event: GestureResponderEvent,
        themeName: string
    ) => {
        setTheme(themeName as any); // Update the theme with the selected theme name
    };

    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 20, // Added padding for better spacing
            }}
        >
            <Text style={{ marginBottom: 10 }}>Selecione seu tema</Text>
            <Text style={{ marginBottom: 20 }}>
                Seu tema atual é: '{theme}'
            </Text>
            <TheamCard
                themes={ThemeNames} // Use dynamic theme names
                onPress={handleThemeChange} // Use the handler to change the theme
            />
        </View>
    );
}
