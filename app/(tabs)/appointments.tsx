import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { GenericCard } from "@/components/GenericCard";
import { RFValue } from "react-native-responsive-fontsize";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";

const Appointments = () => {
    const { appointments, refreshAppointments } = useAppointments();
    useEffect(() => {
        refreshAppointments();
    }, [appointments]);
    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: RFValue(100, 808),
                alignItems: "center",
            }}
        >
            {appointments.map((appointment) => (
                <GenericCard
                    key={appointment.id}
                    text={appointment.doctor}
                    onPress={() =>
                        router.navigate("appointments/" + appointment.id)
                    }
                    subtext={appointment.description}
                    datetime={appointment.datetime}
                />
            ))}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.navigate("appointments/new")}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        backgroundColor: "#0a0",
        borderRadius: 50,
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

export default Appointments;
