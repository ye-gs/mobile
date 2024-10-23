import React from "react";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import AppointmentForm from "@/components/AppointmentForm";
import { useLocalSearchParams } from "expo-router";
import { AppointmentData } from "@/types/appointment";
import { GeneralStyles } from "@/constants/Styles";

const SlugPage = () => {
    const params = useLocalSearchParams() as unknown as AppointmentData;
    return (
        <View style={GeneralStyles().container3}>
            <AppointmentForm {...params} />
        </View>
    );
};
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: "center",
//     },
// });

export default SlugPage;
