import React from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
export function Separator({}) {
    return (
        <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
        />
    );
}

const styles = StyleSheet.create({
    separator: {
        marginVertical: 20,
        height: 1.5,
        width: "80%",
    },
});