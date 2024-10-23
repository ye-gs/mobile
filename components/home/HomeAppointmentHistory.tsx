import { View, Text } from "@/components/Themed";
import { HomeHistoryCard } from "@/components/home/HomeHistoryCard";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { useAppointments } from "@/hooks/appointment";
import { routeAndTransformAppointments } from "@/utils/routeAndTransform";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { shadow } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

export function HomeAppointmentHistory() {
    const { theme } = useTheme();
    const { appointments } = useAppointments();

    appointments.sort((a, b) => {
        return a.datetime.getTime() - b.datetime.getTime();
    });

    const futureAppointments = appointments.filter(
        (appointment) => appointment.datetime.getTime() > Date.now()
    );

    const upcomingAppointments = futureAppointments;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: RFValue(20, 808),
            backgroundColor: Colors[theme].circleBackground,
            borderRadius: RFValue(25, 808),
            width: "100%",
            marginBottom: RFValue(2, 808),
        },
        history__heading: {
            marginTop: RFValue(10, 808),
            flexDirection: "row",
            justifyContent: "space-between",
            width: "85%",
            alignSelf: "center",
            backgroundColor: "transparent",
            paddingVertical: RFValue(10, 808),
        },
        history__title: {
            fontSize: RFValue(16, 808),
            fontWeight: "bold",
        },
        history__link: {
            fontSize: RFValue(12, 808),
            alignSelf: "flex-end",
        },
        flatListContainer: {
            flexGrow: 1,
            paddingBottom: RFValue(40, 808), // Espaço extra na parte inferior
        },
        shadow: {
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: 4 }, // Shadow offset
            shadowOpacity: 0.5, // Shadow opacity
            shadowRadius: 6, // Shadow radius
            elevation: 4, // Elevation for Android shadow
        },
    });

    return (
        <View style={[styles.container, styles.shadow]}>
            <View style={styles.history__heading}>
                <Text style={styles.history__title}>Próximas consultas</Text>
                <Text
                    style={(styles.history__link, { color: Colors[theme].url })}
                    onPress={() => router.replace("/appointments")}
                >
                    Ver todas
                </Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={upcomingAppointments}
                keyExtractor={(item) => (item.id ? item.id.toString() : "")}
                renderItem={({ item: appointment }) => (
                    <HomeHistoryCard
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
                    />
                )}
                contentContainerStyle={styles.flatListContainer}
            />
        </View>
    );
}
