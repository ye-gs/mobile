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
import { GenericButton } from "./GenericButton";
import { GenericInput } from "./GenericInput";
import { GenericIconButton } from "./GenericIconButton";
import { FontAwesome } from "@expo/vector-icons";

const AppointmentForm = (appointment: AppointmentData) => {
    const [doctor, setDoctor] = useState(appointment.doctor || "");
    const [description, setDescription] = useState(
        appointment.description || ""
    );
    const [datetime, setDatetime] = useState(new Date());
    const { createAppointment, editAppointment, deleteAppointment } =
        useAppointments();
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
    const handleDelete = () => {
        deleteAppointment(appointment.slug);
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
        forms: {
            top: RFValue(20, 808),
            gap: 10
        },
        options: {
            height: RFValue(100, 808),
            justifyContent: "space-evenly",
        },
        input:{
            backgroundColor: Colors[theme].background,
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
                    label={<Text style={{color: Colors[theme].text}}>Nome do doutor</Text>}
                    placeholder="Nome do doutor"
                    defaultValue={appointment.doctor}
                    onChange={(e) => setDoctor(e.nativeEvent.text)}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}

                ></TextInput>
                <TextInput
                    label={<Text style={{color: Colors[theme].text}}>Descrição da consulta</Text>}
                    placeholder="Descrição da consulta"
                    defaultValue={appointment.description}
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                    
                    ></TextInput>
                {/* <DateTimePicker
                    value={new Date()}
                    onChange={(e) => {
                        setDatetime(new Date(e.nativeEvent.timestamp!));
                    }}
                /> */}
                <View style={styles.options}>
                    <GenericButton
                        color={Colors[theme].altTextColor}
                        title="Salvar"
                        onPress={handleSave}
                        height={RFValue(40, 808)}
                    />
                    {appointment.slug !== "new" ? (
                        <GenericButton onPress={handleDelete} title="Remover" color={Colors[theme].danger} height={RFValue(40, 808)} ImageComponent={() => (
                            <FontAwesome
                                name="trash-o"
                                size={RFValue(30, 808)}
                                color={"#ffffff"}
                            />
                        )}/> 
                    ) : null}
                </View>
            </View>
        </View>
    );
};

export default AppointmentForm;
