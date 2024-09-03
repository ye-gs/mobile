import React from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { RFValue } from "react-native-responsive-fontsize";

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
        marginVertical: RFValue(20, 808),
        height: RFValue(1.5, 808),
        width: "90%",
    },
});
