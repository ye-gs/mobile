import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

type Appointment = {
    appointmentSlug: string;
};

const AppointmentForm = (appointment: Appointment) => {
    const { appointmentSlug } = appointment;
    const [doctor, setDoctor] = useState("");
    const [description, setDescription] = useState("");
    const [datetime, setDatetime] = useState(new Date());
    const { createAppointment, editAppointment } = useAppointments();
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

    return (
        <View>
            <Text>
                {appointmentSlug ? "Edit Appointment" : "Create Appointment"}
            </Text>
            <TextInput
                label="Nome do doutor"
                placeholder="Nome do doutor"
                onChange={(e) => setDoctor(e.nativeEvent.text)}
            ></TextInput>
            <TextInput
                label="Descrição da consulta"
                placeholder="Descrição da consulta"
                onChange={(e) => setDescription(e.nativeEvent.text)}
            ></TextInput>
            {/* <DateTimePicker
                value={new Date()}
                onChange={(e) => {
                    setDatetime(new Date(e.nativeEvent.timestamp!));
                }}
            /> */}
            <Button title="Save" onPress={handleSave} />
        </View>
    );
};

export default AppointmentForm;
