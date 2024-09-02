import React, { useState } from "react";
import { View, Text } from "./Themed";
import { useAppointments } from "@/hooks/appointment";
import { router } from "expo-router";
import { Button, TextInput, Portal, Dialog } from "react-native-paper";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { AppointmentData } from "@/types/appointment";
import { MarkedBM, Bookmark } from "@/assets";
import { GenericButton } from "./GenericButton";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Notifications from "expo-notifications";

const AppointmentForm = (appointment: AppointmentData) => {
    if (appointment.slug === "new") {
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
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogAction, setDialogAction] = useState<"save" | "delete">("save");
    const [isBookmarked, setIsBookmarked] = useState(
        Boolean(appointment.isBookmarked) || false
    );
    const BookmarkImage = isBookmarked ? MarkedBM : Bookmark;

    const {
        createAppointment,
        editAppointment,
        deleteAppointment,
        fetchAppointments,
    } = useAppointments();
    const { theme } = useTheme();

    const showDatePicker = () => setDatePickerVisible(true);
    const hideDatePicker = () => setDatePickerVisible(false);
    const handleConfirm = (date: Date) => {
        setDatetime(date);
        hideDatePicker();
    };

    const handleSave = () => {
        setDialogAction("save");
        setDialogVisible(true);
    };

    const handleDelete = () => {
        setDialogAction("delete");
        setDialogVisible(true);
    };

    const handleDialogConfirm = async () => {
        setDialogVisible(false);

        if (dialogAction === "save") {
            if (isBookmarked) {
                let notificationDate = new Date(datetime);
                notificationDate.setDate(notificationDate.getDate() - 1);
                await Notifications.setNotificationChannelAsync("whatsapp", {
                    name: "Whatsapp Notifications",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    sound: "whatsapp.wav",
                });

                await Notifications.scheduleNotificationAsync({
                    identifier: "whatsapp",
                    content: {
                        title: "Lembrete de consulta",
                        body: `Você tem uma consulta marcada com o doutor ${doctor} sobre ${description} em ${datetime.toLocaleString("pt-BR")}`,
                        sound: "whatsapp.wav",
                        vibrate: [],
                        priority:
                            Notifications.AndroidNotificationPriority.HIGH,
                    },
                    trigger: {
                        date: notificationDate,
                        channelId: "whatsapp",
                    },
                });
            }

            if (appointment.slug !== "new") {
                await editAppointment(appointment.slug, {
                    doctor,
                    description,
                    datetime,
                    isBookmarked,
                });
            } else {
                await createAppointment({
                    doctor,
                    description,
                    datetime,
                    isBookmarked,
                });
            }

            router.push("/appointments");
            await fetchAppointments();
        } else if (dialogAction === "delete") {
            await deleteAppointment(appointment.slug);
            router.push("/appointments");
            await fetchAppointments();
        }
    };

    const handleDialogDismiss = () => setDialogVisible(false);

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
            marginLeft: RFValue(8, 808),
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
            marginTop: RFValue(10, 808),
        },
        input: {
            backgroundColor: Colors[theme].circleBackground,
            borderRadius: 20,
            borderColor: Colors[theme].tint,
            borderWidth: 2,
        },
        text: {
            fontSize: RFValue(16, 808),
            color: Colors[theme].text,
        },
        radioButtonLabel: {
            fontSize: RFValue(14, 808),
            color: Colors[theme].text,
        },
        daysContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: RFValue(10, 808),
        },
        checkboxContainer: {
            flexDirection: "row",
            alignItems: "center",
        },
        label: {
            color: Colors[theme].text,
            fontSize: RFValue(16, 808),
        },
        cancelButton: {
            color: Colors[theme].danger,
        },
        confirmButton: {
            color: "green",
        },
        datepickerButton: {
            borderWidth: 2,
            borderColor: Colors[theme].tint,
            marginTop: RFValue(10, 808),
            padding: RFValue(7, 808),
            backgroundColor: Colors[theme].circleBackground,
        },
        underLine: { width: "90%" ,
            marginLeft: "5%",
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
                    label={<Text style={styles.text}>Nome do Doutor</Text>}
                    placeholder="Nome do Doutor"
                    onChangeText={setDoctor}
                    contentStyle={[
                        styles.input,
                        { backgroundColor: Colors[theme].circleBackground },
                    ]}
                    style={{ backgroundColor: "transparent" }}
                    textColor={Colors[theme].text}
                    underlineColor="transparent"
                    activeUnderlineColor={Colors[theme].tint}
                    selectionColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].tint}
                />
                <TextInput
                    label={
                        <Text style={styles.text}>Descrição da Consulta</Text>
                    }
                    placeholder="Descrição da Consulta"
                    onChangeText={setDescription}
                    contentStyle={[
                        styles.input,
                        { backgroundColor: Colors[theme].circleBackground },
                    ]}
                    style={{ backgroundColor: "transparent" }}
                    textColor={Colors[theme].text}
                    underlineColor="transparent"
                    activeUnderlineColor={Colors[theme].tint}
                    selectionColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].tint}
                />
                <View
                    style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}
                >
                    <Text style={styles.title}>
                        {isBookmarked
                            ? "Não ativar notificação"
                            : "Ativar notificação"}
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
                <Button
                    onPress={showDatePicker}
                    style={styles.datepickerButton}
                >
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
                    display="default"
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
                            title="Deletar"
                            color={Colors[theme].danger}
                            height={RFValue(40, 808)}
                            ImageComponent={() => (
                                <FontAwesome
                                    name="trash-o"
                                    size={RFValue(30, 808)}
                                    color="#fff"
                                />
                            )}
                        />
                    ) : null}
                </View>
            </View>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={handleDialogDismiss}>
                    <Dialog.Icon icon="alert" />
                    <Dialog.Title style={styles.title}>
                        {dialogAction === "save"
                            ? "Salvar compromisso?"
                            : "Deletar compromisso?"}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.text}>
                            {dialogAction === "save"
                                ? "Você tem certeza que deseja salvar esse compromisso? Esta ação irá adicionar um novo compromisso ao seu calendário. Certifique-se de revisar todos os detalhes antes de confirmar."
                                : "Tem certeza que deseja deletar esse compromisso? Esta ação removerá permanentemente o compromisso do seu calendário. Você não poderá desfazer essa ação após a confirmação."}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={handleDialogDismiss}>
                            <Text style={styles.cancelButton}>Cancelar</Text>
                        </Button>
                        <Button onPress={handleDialogConfirm}>
                            <Text style={styles.confirmButton}>OK</Text>
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

export default AppointmentForm;
