import React from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import MedForm from "@/components/MedForm";
import { useLocalSearchParams } from "expo-router";
import { MedData } from "@/types/med";

const SlugPage = () => {
    const params = useLocalSearchParams() as unknown as MedData;
    return (
        <View style={styles.container}>
            <MedForm {...params} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});

export default SlugPage;
