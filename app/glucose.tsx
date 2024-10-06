import React from "react";
import { View, StyleSheet } from "react-native";
import GlucoseMeasures from "@/components/GlucoseMeasures";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { GeneralStyles } from "@/constants/Styles";

const GlucosePage = () => {
    const { theme } = useTheme();
    return (
        <View
            style={[
                GeneralStyles().container8,
                { backgroundColor: Colors[theme].background },
            ]}
        >
            <GlucoseMeasures />
        </View>
    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//         justifyContent: "center",
//     },
// });

export default GlucosePage;
