import React, { useState } from "react";
import { View, Text } from "./Themed";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { AppointmentData } from "@/types/appointment";
import { MarkedBM, Bookmark } from "@/assets";
import { GenericButton } from "./GenericButton";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Alert } from "react-native";

const AppointmentForm = (appointment: AppointmentData) => {
    if (appointment.slug == "new") {
        appointment = {
            id: "new",
            doctor: "",
            description: "",
            datetime: new Date().toISOString(),
            slug: "new",
            isBookmarked: false,
        };
    }
    const [doctor, setDoctor] = useState(appointment.doctor || "");
    const [description, setDescription] = useState(
        appointment.description || ""
    );
    const [datetime, setDatetime] = useState(
        new Date(appointment.datetime) || new Date()
    );

    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };
    const handleConfirm = (date: Date) => {
        setDatetime(date);
        hideDatePicker();
    };
    const [isBookmarked, setIsBookmarked] = useState(
        appointment.isBookmarked == 1 ? true : false || false
    );
    const BookmarkImage = isBookmarked ? MarkedBM : Bookmark;
    const {
        createAppointment,
        editAppointment,
        deleteAppointment,
        fetchAppointments,
    } = useAppointments();
    const { theme } = useTheme();
    const handleSave = () => {
        Alert.alert(
            "Salvar compromisso?",
            "Você tem certeza que deseja salvar esse compromisso?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        if (appointment.slug !== "new") {
                            editAppointment(appointment.slug, {
                                doctor,
                                description,
                                datetime,
                                isBookmarked,
                            });
                        } else {
                            createAppointment({
                                doctor,
                                description,
                                datetime,
                                isBookmarked,
                            });
                        }
                        router.push("/appointments");
                        fetchAppointments();
                    },
                },
            ]
        );
    };

    const handleDelete = () => {
        Alert.alert(
            "Deletar compromisso?",
            "Tem certeza que deseja deletar esse compromisso?",
            [
                {
                    text: "Cancelar",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        deleteAppointment(appointment.slug);
                        router.push("/appointments");
                        fetchAppointments();
                    },
                },
            ]
        );
    };

    const styles = StyleSheet.create({
        container: {
            width: "80%",
            top: "20%",
        },
        bookmarkView: {
            flex: 1,
            alignItems: "flex-end",
            borderRadius: 10,
        },
        bookmark: {
            width: RFValue(22, 808),
            height: RFValue(22, 808),
            marginTop: RFValue(3, 808),
            marginRight: RFValue(8, 808),
        },
        title: {
            fontWeight: "bold",
            fontSize: RFValue(20, 808),
            alignSelf: "center",
        },
        forms: {
            top: RFValue(20, 808),
            gap: 10,
        },
        options: {
            height: RFValue(100, 808),
            justifyContent: "space-evenly",
        },
        input: {
            backgroundColor: Colors[theme].background,
        },
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
                    label={
                        <Text style={{ color: Colors[theme].text }}>
                            Nome do doutor
                        </Text>
                    }
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
                    label={
                        <Text style={{ color: Colors[theme].text }}>
                            Descrição da consulta
                        </Text>
                    }
                    placeholder="Descrição da consulta"
                    defaultValue={appointment.description}
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                ></TextInput>
                <View
                    style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.title}>
                        {isBookmarked
                            ? "Não marcar para lembrete"
                            : "Marcar para lembrete"}
                    </Text>
                    <View style={styles.bookmarkView}>
                        <BookmarkImage
                            style={styles.bookmark}
                            onPress={() => setIsBookmarked(!isBookmarked)}
                            fill={Colors[theme].tabIconSelected}
                            width={styles.bookmark.width}
                            height={styles.bookmark.height}
                        />
                    </View>
                </View>

                <Button onPress={showDatePicker}>
                    <Text style={{ color: Colors[theme].text }}>
                        Data da consulta{" "}
                        {datetime
                            ? datetime.toLocaleString("pt-Br")
                            : "Nenhuma data selecionada"}
                    </Text>
                </Button>
                <DateTimePickerModal
                    date={datetime ? new Date(datetime) : undefined}
                    minimumDate={new Date()}
                    isVisible={datePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    display="spinner"
                    onCancel={hideDatePicker}
                />
                <View style={styles.options}>
                    <GenericButton
                        color={Colors[theme].altTextColor}
                        title="Salvar"
                        onPress={handleSave}
                        height={RFValue(40, 808)}
                    />
                    {appointment.slug !== "new" ? (
                        <GenericButton
                            onPress={handleDelete}
                            title="Remover"
                            color={Colors[theme].danger}
                            height={RFValue(40, 808)}
                            ImageComponent={() => (
                                <FontAwesome
                                    name="trash-o"
                                    size={RFValue(30, 808)}
                                    color={"#ffffff"}
                                />
                            )}
                        />
                    ) : null}
                </View>
            </View>
        </View>
    );
};

export default AppointmentForm;
