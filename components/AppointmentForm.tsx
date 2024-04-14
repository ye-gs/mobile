import React, { useState } from "react";
import { Button } from "react-native";
import { View, Text } from "./Themed";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { AppointmentData } from "@/types/appointment";

const AppointmentForm = (appointment: AppointmentData) => {
    const [doctor, setDoctor] = useState(appointment.doctor || "");
    const [description, setDescription] = useState(
        appointment.description || ""
    );
    const [datetime, setDatetime] = useState(new Date());
    const { createAppointment, editAppointment } = useAppointments();
    const { theme } = useTheme();
    const handleSave = () => {
        if (appointment.slug !== "new") {
            editAppointment(appointment.slug, {
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
            top: "20%",
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
        options:{
            height: RFValue(100, 808),
            justifyContent: 'space-evenly'
        }
    });
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {appointment.slug !== "new"
                    ? "Editar consulta"
                    : "Criar consulta"}
            </Text>
            <View style={styles.forms}>
                <TextInput
                    label="Nome do doutor"
                    placeholder="Nome do doutor"
                    defaultValue={appointment.doctor}
                    onChange={(e) => setDoctor(e.nativeEvent.text)}
                    style={styles.input}
                ></TextInput>
                <TextInput
                    label="Descrição da consulta"
                    placeholder="Descrição da consulta"
                    defaultValue={appointment.description}
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                    style={styles.input}
                ></TextInput>
                {/* <DateTimePicker
                value={new Date()}
                onChange={(e) => {
                    setDatetime(new Date(e.nativeEvent.timestamp!));
                }}
            /> */}
                <View style={styles.options}>
                    <Button
                        color={Colors[theme].altTextColor}
                        title="Salvar"
                        onPress={handleSave}
                    />
                    {appointmentSlug !== 'new' ? <Button
                        color={Colors[theme].danger}
                        title="Remover"
                    />: ""}
                </View>
            </View>
        </View>
    );
};

export default AppointmentForm;
