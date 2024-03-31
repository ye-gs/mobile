import React from "react";
import { View, StyleSheet } from "react-native";
import AppointmentForm from "@/components/AppointmentForm";
import { useLocalSearchParams } from "expo-router";

const SlugPage = () => {
    const { slug } = useLocalSearchParams();
    const appointmentSlug = slug as string;
    return (
        <View style={styles.container}>
            <AppointmentForm appointmentSlug={appointmentSlug} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SlugPage;