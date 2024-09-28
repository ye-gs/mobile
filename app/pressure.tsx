import React from "react";
import { View, StyleSheet } from "react-native";
import PressureMeasures from "@/components/PressureMeasures";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";

const PressurePage = () => {
    const { theme } = useTheme();
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: Colors[theme].background },
            ]}
        >
            <PressureMeasures />
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

export default PressurePage;
