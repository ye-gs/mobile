import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { GenericCard } from "@/components/GenericCard";
import { RFValue } from "react-native-responsive-fontsize";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { routeAndTransform } from "@/utils/routeAndTransform";
const Appointments = () => {
    const { appointments, fetchAppointments } = useAppointments();

    useEffect(() => {
        fetchAppointments();
    }, []);
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        addButton: {
            position: "absolute",
            right: 30,
            bottom: 30,
            backgroundColor: Colors[theme].altTextColor,
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
            tintColor: "black",
        },
    });
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
                        routeAndTransform({
                            ...appointment,
                            datetime: appointment.datetime.toISOString(),
                            id: appointment.id!,
                            isBookmarked: appointment.isBookmarked ? 1 : 0,
                        })
                    }
                    subtext={appointment.description}
                    isBookmarked={appointment.isBookmarked}
                    datetime={appointment.datetime}
                />
            ))}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => router.push("/appointments/new")}
            >
                <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Appointments;
