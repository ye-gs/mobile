import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";

type Appointment = {
    appointmentSlug: string;
};

const AppointmentForm = (appointment: Appointment) => {
    const { appointmentSlug } = appointment;
    const [doctor, setDoctor] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState(new Date());
    const { createAppointment, editAppointment } = useAppointments();
    const { theme } = useTheme();

    const handleSave = () => {
        if (appointmentSlug !== "new") {
            editAppointment(appointmentSlug, {
                doctor,
                description,
                datetime,
            });
        } else {
            createAppointment({
                doctor,
                description,
                datetime,
            });
        }
        //reload useEffect on /appointments
        router.push("/appointments");
    };

    const styles = StyleSheet.create({
        container: {
            width: "80%",
            top: "20%"
        },
        title: {
            fontWeight: "bold",
            fontSize: RFValue(20, 808),
            alignSelf: "center",
        },
        input: {
            backgroundColor: Colors[theme].background,
            borderColor: Colors[theme].borderColor,
            borderWidth: RFValue(1, 808),
        },
        forms: {
            top: RFValue(20, 808),
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {appointmentSlug !== "new"
                    ? "Editar consulta"
                    : "Criar consulta"}
            </Text>
            <View style={styles.forms}>
                <TextInput
                    label="Nome do doutor"
                    placeholder="Nome do doutor"
                    onChange={(e) => setDoctor(e.nativeEvent.text)}
                    style={styles.input}
                ></TextInput>
                <TextInput
                    label="Descrição da consulta"
                    placeholder="Descrição da consulta"
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                    style={styles.input}
                ></TextInput>
                {/* <DateTimePicker
                value={new Date()}
                onChange={(e) => {
                    setDatetime(new Date(e.nativeEvent.timestamp!));
                }}
            /> */}
                <Button
                    color={Colors[theme].altTextColor}
                    title="Salvar"
                    onPress={handleSave}
                />
            </View>
        </View>
    );
};

export default AppointmentForm;
