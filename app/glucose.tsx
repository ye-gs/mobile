import React from "react";
import { View, StyleSheet } from "react-native";
import GlucoseMeasures from "@/components/GlucoseMeasures";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";

const GlucosePage = () => {
    const { theme } = useTheme();
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[theme].background },
            ]}
        >
            <GlucoseMeasures />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default GlucosePage;
