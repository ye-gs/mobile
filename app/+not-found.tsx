import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { GeneralStyles } from "@/constants/Styles";
import React from "react";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View style={GeneralStyles().container5}>
                <Text style={GeneralStyles().title1}>
                    This screen doesn't exist.
                </Text>

                <Link href="/" style={GeneralStyles().link1}>
                    <Text style={GeneralStyles().linkText1}>
                        Go to home screen!
                    </Text>
                </Link>
            </View>
        </>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//         padding: 20,
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: "bold",
//     },
//     link: {
//         marginTop: 15,
//         paddingVertical: 15,
//     },
//     linkText: {
//         fontSize: 14,
//         color: "#2e78b7",
//     },
// });
