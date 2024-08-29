import React from "react";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { GestureResponderEvent, Pressable } from "react-native";
import { View, Text } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface ThemeCardProps {
    themes: string[]; // Array of theme names
    onPress: (event: GestureResponderEvent, themeName: string) => void; // Pass theme name on press
}

export function TheamCard(props: ThemeCardProps) {
    const { theme, setTheme } = useTheme(); // Access theme and setTheme from context

    const handlePress = (event: GestureResponderEvent, themeName: string) => {
        setTheme(themeName as any);
        props.onPress(event, themeName); // Call onPress with event and selected theme name
    };

    return (
        <>
            {props.themes.map((themeName, index) => (
                <Pressable
                    key={index} // Using index as key for now; consider using unique identifiers
                    style={{
                        height: RFValue(80, 808),
                        minHeight: "auto",
                        width: "90%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderColor:
                            Colors[theme]?.borderColor || "transparent",
                    }}
                    onPress={(event) => handlePress(event, themeName)}
                >
                    <View
                        style={{
                            backgroundColor:
                                Colors[themeName]?.themeColor || "transparent",
                            height: "80%",
                            aspectRatio: 5,
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: RFValue(200, 808),
                        }}
                    >
                        <Text
                            style={{
                                fontSize: RFValue(16, 808),
                                fontWeight: "bold",
                                color:
                                    Colors[themeName]?.text ||
                                    Colors[theme]?.text ||
                                    "black",
                            }}
                        >
                            {themeName}
                        </Text>
                    </View>
                </Pressable>
            ))}
        </>
    );
}
