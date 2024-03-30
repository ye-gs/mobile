import React from "react";
import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { AppointmentCard } from "@/components/appointments/AppointmentCard";

const Meds = () => {
    return (
        <View style={styles.container}>
            <AppointmentCard></AppointmentCard>
            <AppointmentCard></AppointmentCard>
            <AppointmentCard></AppointmentCard>
            <AppointmentCard></AppointmentCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Meds;
