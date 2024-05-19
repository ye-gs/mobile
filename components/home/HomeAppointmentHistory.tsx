import { View, Text } from "@/components/Themed";
import { HomeHistoryCard } from "@/components/home/HomeHistoryCard";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { useAppointments } from "@/hooks/appointment";
import { routeAndTransformAppointments } from "@/utils/routeAndTransform";
import { router } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export function HomeAppointmentHistory() {
    const { theme } = useTheme();

    const { appointments } = useAppointments();
    appointments.sort((a, b) => {
        return a.datetime.getTime() - b.datetime.getTime();
    });
    // get only appointments that are in the future
    const futureAppointments = appointments.filter(
        (appointment) => appointment.datetime.getTime() > Date.now()
    );
    // get the two most recent appointments
    const upcomingAppointments = futureAppointments.slice(0, 2);
    return (
        <View style={styles.history}>
            <View style={styles.history__heading}>
                <Text style={styles.history__title}>Próximas consultas</Text>
                <Text
                    style={(styles.history__link, { color: Colors[theme].url })}
                    onPress={() => router.replace("/appointments")}
                >
                    Ver todas
                </Text>
            </View>
            {upcomingAppointments.map((appointment) => (
                <HomeHistoryCard
                    key={appointment.id}
                    text={appointment.doctor}
                    description={appointment.description}
                    date={appointment.datetime.toDateString()}
                    imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg"
                    isBookmarked={appointment.isBookmarked}
                    onPress={() =>
                        routeAndTransformAppointments({
                            ...appointment,
                            datetime: appointment.datetime.toISOString(),
                            id: appointment.id!,
                            isBookmarked: appointment.isBookmarked ? 1 : 0,
                        })
                    }
                ></HomeHistoryCard>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    history: {
        paddingTop: RFValue(30, 808),
        width: "80%",
        gap: RFValue(10, 808),
    },
    history__heading: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    history__title: {
        fontSize: RFValue(16, 808),
        fontWeight: "bold",
    },
    history__link: {
        fontSize: RFValue(12, 808),
        alignSelf: "flex-end",
    },
});
