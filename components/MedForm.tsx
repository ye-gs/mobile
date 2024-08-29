import React, { useState } from "react";
import { View, Text } from "./Themed";
import { useMeds } from "@/hooks/meds";
import { router } from "expo-router";
import {
    TextInput,
    Checkbox,
    Dialog,
    Portal,
    Button,
} from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { MedData } from "@/types/med";
import { MarkedBM, Bookmark } from "@/assets";
import { GenericButton } from "./GenericButton";
import * as Notifications from "expo-notifications";
import DateTimePicker, {
    CancelButton,
} from "react-native-modal-datetime-picker";

const MedForm = (med: MedData) => {
    if (med.slug === "new") {
        med = {
            id: "new",
            name: "",
            description: "",
            time: "",
            frequency: "",
            slug: "new",
            isBookmarked: false,
        };
    }

    const [name, setDoctor] = useState(med.name || "");
    const [description, setDescription] = useState(med.description || "");
    const [frequency, setFrequency] = useState(med.frequency || "");
    const [time, setTime] = useState(med.time || "");
    const [isBookmarked, setIsBookmarked] = useState(
        Boolean(med.isBookmarked) || false
    );
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [dialogAction, setDialogAction] = useState<"save" | "delete" | null>(
        null
    );

    const hideDialog = () => setDialogVisible(false);

    const BookmarkImage = isBookmarked ? MarkedBM : Bookmark;
    const { createMed, editMed, deleteMed, fetchMeds } = useMeds();
    const { theme } = useTheme();
    const daysOfWeek = [
        { label: "D", value: "Dom" },
        { label: "S", value: "Seg" },
        { label: "T", value: "Ter" },
        { label: "Q", value: "Qua" },
        { label: "Q", value: "Qui" },
        { label: "S", value: "Sex" },
        { label: "S", value: "Sab" },
    ];

    const toggleDay = (day: string) => {
        setSelectedDays((prevDays) =>
            prevDays.includes(day)
                ? prevDays.filter((d) => d !== day)
                : [...prevDays, day]
        );
    };

    const handleSave = async () => {
        setDialogAction("save");
        setDialogVisible(true);
    };

    const handleDelete = async () => {
        setDialogAction("delete");
        setDialogVisible(true);
    };

    const handleDialogConfirm = async () => {
        hideDialog();

        if (dialogAction === "save") {
            if (isBookmarked) {
                let notificationDate = new Date(frequency);
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
                        title: "Lembrete de remédio",
                        body: `Você tem um remédio marcado com o remédio ${name} sobre ${description} a cada ${frequency}`,
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
            if (med.slug !== "new") {
                await editMed(med.slug, {
                    name,
                    time,
                    description,
                    frequency,
                    isBookmarked,
                });
            } else {
                await createMed({
                    name,
                    time,
                    description,
                    frequency,
                    isBookmarked,
                });
            }
            router.push("/meds");
            await fetchMeds();
        } else if (dialogAction === "delete") {
            await deleteMed(med.slug);
            router.push("/meds");
            await fetchMeds();
        }
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        setTime(
            date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
        hideDatePicker();
    };

    const styles = StyleSheet.create({
        container: {
            width: "80%",
            top: "20%",
        },
        bookmarkView: {
            alignItems: "center",
            flexDirection: "row",
            marginTop: RFValue(10, 808),
        },
        bookmark: {
            width: RFValue(22, 808),
            height: RFValue(22, 808),
            marginLeft: RFValue(8, 808),
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
            color: "red",
        },
        confirmButton: {
            color: "green",
        },
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {med.slug !== "new" ? "Editar remédio" : "Criar remédio"}
            </Text>
            <View style={styles.forms}>
                <TextInput
                    label={<Text style={styles.text}>Nome do remédio</Text>}
                    placeholder="Nome do remédio"
                    defaultValue={med.name}
                    onChange={(e) => setDoctor(e.nativeEvent.text)}
                    mode="outlined"
                    outlineStyle={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                />
                <TextInput
                    label={
                        <Text style={styles.text}>Descrição do remédio</Text>
                    }
                    placeholder="Descrição do remédio"
                    defaultValue={med.description}
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                    mode="outlined"
                    outlineStyle={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                />
                <TouchableOpacity onPress={showDatePicker}>
                    <TextInput
                        label={<Text style={styles.text}>Hora do remédio</Text>}
                        placeholder="Hora do remédio"
                        value={time}
                        editable={false} // Prevent keyboard from appearing
                        mode="outlined"
                        outlineStyle={styles.input}
                        textColor={Colors[theme].text}
                        outlineColor={Colors[theme].text}
                        activeOutlineColor={Colors[theme].altTextColor}
                    />
                </TouchableOpacity>

                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

                <Text style={styles.text}>Frequência:</Text>
                <View style={styles.daysContainer}>
                    {daysOfWeek.map((day) => (
                        <View key={day.value} style={styles.checkboxContainer}>
                            <Checkbox
                                status={
                                    selectedDays.includes(day.value)
                                        ? "checked"
                                        : "unchecked"
                                }
                                onPress={() => toggleDay(day.value)}
                                color={Colors[theme].altTextColor}
                            />
                            <Text style={styles.label}>{day.label}</Text>
                        </View>
                    ))}
                </View>

                <View style={styles.bookmarkView}>
                    <Text style={styles.title}>
                        {isBookmarked
                            ? "Não marcar para lembrete"
                            : "Marcar para lembrete"}
                    </Text>
                    <BookmarkImage
                        style={styles.bookmark}
                        onPress={() => setIsBookmarked(!isBookmarked)}
                        fill={Colors[theme].tabIconSelected}
                        width={styles.bookmark.width}
                        height={styles.bookmark.height}
                    />
                </View>

                <View style={styles.options}>
                    <GenericButton
                        color={Colors[theme].altTextColor}
                        title="Salvar"
                        onPress={handleSave}
                        height={RFValue(40, 808)}
                    />
                    {med.slug !== "new" ? (
                        <GenericButton
                            onPress={handleDelete}
                            color="red"
                            title="Deletar"
                            height={RFValue(40, 808)}
                        />
                    ) : null}
                </View>
            </View>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                    <Dialog.Icon icon="alert" />
                    <Dialog.Title style={styles.title}>
                        {dialogAction === "save"
                            ? "Salvar compromisso?"
                            : "Deletar compromisso?"}
                    </Dialog.Title>
                    <Dialog.Content>
                        <Text>
                            {dialogAction === "save"
                                ? "Você tem certeza que deseja salvar esse compromisso? Esta ação irá adicionar um novo compromisso ao seu calendário. Certifique-se de revisar todos os detalhes antes de confirmar."
                                : "Tem certeza que deseja deletar esse compromisso? Esta ação removerá permanentemente o compromisso do seu calendário. Você não poderá desfazer essa ação após a confirmação."}
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>
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

export default MedForm;
