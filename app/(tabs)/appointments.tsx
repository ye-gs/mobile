import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ScrollView } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { GenericCard } from "@/components/GenericCard";
import { RFValue } from "react-native-responsive-fontsize";
import { useAppointments } from "@/hooks/appointment";
import { AppointmentMiddleware } from "@/types/appointment";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const routeAndTransform = (appointment: AppointmentMiddleware) => {
    router.push({
        pathname: `appointments/${appointment.id}`,
        params: {
            ...appointment,
        },
    } as never);
};

const Appointments = () => {
    const { appointments, refreshAppointments } = useAppointments();
    useEffect(() => {
        refreshAppointments();
    }, [appointments]);
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
            tintColor: 'black'
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
                        })
                    }
                    subtext={appointment.description}
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
