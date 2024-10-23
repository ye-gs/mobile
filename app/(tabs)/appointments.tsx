import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, FlexAlignType } from "react-native";
import { ScrollView } from "@/components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { GenericCard } from "@/components/GenericCard";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";
import Colors, { otherColors } from "@/constants/Colors";
import { GeneralStyles } from "@/constants/Styles";
import { useTheme } from "@/contexts/theme";
import { routeAndTransformAppointments } from "@/utils/routeAndTransform";

const Appointments = () => {
    const { appointments, fetchAppointments } = useAppointments();

    useEffect(() => {
        fetchAppointments();
    }, []);
    // const { theme } = useTheme();

    // const styles = StyleSheet.create({
    //     addButton: {
    //         position: "absolute",
    //         right: 30,
    //         bottom: 30,
    //         backgroundColor: Colors[theme].altTextColor,
    //         borderRadius: 50,
    //         width: 60,
    //         height: 60,
    //         justifyContent: "center",
    //         alignItems: "center",
    //         shadowColor: "#000",
    //         shadowOffset: { width: 0, height: 2 },
    //         shadowOpacity: 0.25,
    //         shadowRadius: 3.84,
    //         elevation: 5,
    //         tintColor: "black",
    //     },
    //     shadow: {
    //         shadowColor: "#000", // Shadow color
    //         shadowOffset: { width: 0, height: 2 }, // Shadow offset
    //         shadowOpacity: 0.25, // Shadow opacity
    //         shadowRadius: 3.84, // Shadow radius
    //         elevation: 5, // Elevation for Android shadow
    //     },
    // });
    return (
        <ScrollView contentContainerStyle={GeneralStyles().container1}>
            {appointments.map((appointment) => (
                <GenericCard
                    key={appointment.id}
                    text={appointment.doctor}
                    onPress={() =>
                        routeAndTransformAppointments({
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
                style={[GeneralStyles().addButton1, GeneralStyles().shadow1]}
                onPress={() => router.push("/appointments/new")}
            >
                <AntDesign
                    name="plus"
                    size={GeneralStyles().size24}
                    color={otherColors.white1}
                />
            </TouchableOpacity>
        </ScrollView>
    );
};

export default Appointments;
