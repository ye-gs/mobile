import { View, Text } from "@/components/Themed";
import { HomeHistoryCard } from "@/components/home/HomeHistoryCard";
import React from "react";
import { StyleSheet } from "react-native";

export function HomeAppointmentHistory() {
    return (
        <View style={styles.history}>
            <View style={styles.history__heading}>
                <Text style={styles.history__title}>Próximas consultas</Text>
                <Text style={styles.history__link}>Ver todas</Text>
            </View>
            <HomeHistoryCard
                text="Exame de sangue"
                date="Hoje"
                imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg"
                isBookmarked={true}
            ></HomeHistoryCard>
            <HomeHistoryCard
                text="Exame de glicose"
                date="Amanhã"
                imageUrl="https://clinicaunix.com.br/wp-content/uploads/2019/09/COMO-E-REALIZADO-O-EXAME-DE-PROSTATA.jpg"
                isBookmarked={false}
            ></HomeHistoryCard>
        </View>
    );
}

const styles = StyleSheet.create({
    history: {
        flex: 2.5,
        paddingTop: 30,
        width: "80%",
        gap: 10,
    },
    history__heading: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    history__title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    history__link: {
        fontSize: 12,
        alignSelf: "flex-end",
        color: "rgba(64, 124, 226, 1)",
    },
});
