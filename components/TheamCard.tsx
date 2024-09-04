import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { GestureResponderEvent, Pressable } from "react-native";
import { View, Text } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useUser } from "@/contexts/user";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface ThemeCardProps {
    themes: string[]; // Array of theme names
    onPress: (event: GestureResponderEvent, themeName: string) => void; // Pass theme name on press
    //onFavoritePress: (themeName: string) => void; // TODO: Mudar o tema favorito do usuario
}

export function ThemeCard(props: ThemeCardProps) {
    const { theme, setTheme } = useTheme(); // Access theme and setTheme from context
    const { user } = useUser();
    const [favoriteTheme, setFavoriteTheme] = useState<string | null>(null); // State to track the favorite theme
    useEffect(() => {
        if (user) {
            const fetchUserTheme = async () => {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setFavoriteTheme(userDoc.data().favoriteTheme);
                }
            };
            fetchUserTheme();
        }
    }, [user]);

    const handlePress = (event: GestureResponderEvent, themeName: string) => {
        setTheme(themeName as any);
        props.onPress(event, themeName); // Call onPress with event and selected theme name
        //onFavoritePress: (themeName: string) => void; // Callback for when the favorite icon is pressed
    };

    const handleFavoritePress = async (
        event: GestureResponderEvent,
        themeName: string
    ) => {
        const newFavorite = favoriteTheme === themeName ? null : themeName;
        if (newFavorite && user) {
            setTheme(themeName as any);
            props.onPress(event, themeName);
            await updateDoc(doc(db, "/users", user.uid), {
                favoriteTheme: themeName,
            });
        }
        setFavoriteTheme(newFavorite);
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

                    <Pressable
                        onPress={(event) =>
                            handleFavoritePress(event, themeName)
                        }
                        style={{ padding: RFValue(10, 808) }}
                    >
                        <AntDesign
                            name={
                                favoriteTheme === themeName ? "star" : "staro"
                            }
                            size={RFValue(24, 808)}
                            color={
                                favoriteTheme === themeName
                                    ? "gold"
                                    : Colors[theme]?.subtext || "gray"
                            }
                        />
                    </Pressable>
                </Pressable>
            ))}
        </>
    );
}
