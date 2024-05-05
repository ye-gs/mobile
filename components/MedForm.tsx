import React, { useState } from "react";
import { View, Text } from "./Themed";
import { useMeds } from "@/hooks/meds";
import { router } from "expo-router";
import { TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { MedData } from "@/types/med";
import { MarkedBM, Bookmark } from "@/assets";
import { GenericButton } from "./GenericButton";
import { FontAwesome } from "@expo/vector-icons";
import { Alert } from "react-native";
import * as Notifications from "expo-notifications";

const MedForm = (med: MedData) => {
    if (med.slug == "new") {
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
        med.isBookmarked == 1 ? true : false || false
    );

    const BookmarkImage = isBookmarked ? MarkedBM : Bookmark;
    const { createMed, editMed, deleteMed, fetchMeds } = useMeds();
    const { theme } = useTheme();
    const handleSave = async () => {
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
                    onPress: async () => {
                        if (isBookmarked) {
                            let notificationDate = new Date(frequency);
                            notificationDate.setDate(
                                notificationDate.getDate() - 1
                            );
                            await Notifications.setNotificationChannelAsync(
                                "whatsapp",
                                {
                                    name: "Whatsapp Notifications",
                                    importance:
                                        Notifications.AndroidImportance.MAX,
                                    vibrationPattern: [0, 250, 250, 250],
                                    sound: "whatsapp.wav",
                                }
                            );

                            await Notifications.scheduleNotificationAsync({
                                identifier: "whatsapp",
                                content: {
                                    title: "Lembrete de remédio",
                                    body: `Você tem uma remédio marcado com o remédio ${name} sobre ${description} a cado ${frequency}`,
                                    sound: "whatsapp.wav",
                                    vibrate: [],
                                    priority:
                                        Notifications
                                            .AndroidNotificationPriority.HIGH,
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
                    },
                },
            ]
        );
    };

    const handleDelete = async () => {
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
                    onPress: async () => {
                        await deleteMed(med.slug);
                        router.push("/meds");
                        await fetchMeds();
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
                {med.slug !== "new" ? "Editar remédio" : "Criar remédio"}
            </Text>
            <View style={styles.forms}>
                <TextInput
                    label={
                        <Text style={{ color: Colors[theme].text }}>
                            Nome do remédio
                        </Text>
                    }
                    placeholder="Nome do remédio"
                    defaultValue={med.name}
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
                            Descrição do remédio
                        </Text>
                    }
                    placeholder="Descrição do remédio"
                    defaultValue={med.description}
                    onChange={(e) => setDescription(e.nativeEvent.text)}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                ></TextInput>
                <TextInput
                    label={
                        <Text style={{ color: Colors[theme].text }}>
                            Frequência do remédio
                        </Text>
                    }
                    placeholder="Frequência do remédio"
                    defaultValue={med.description}
                    onChange={(e) => setFrequency(e.nativeEvent.text)}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                ></TextInput>
                <TextInput
                    label={
                        <Text style={{ color: Colors[theme].text }}>
                            Hora do remédio
                        </Text>
                    }
                    placeholder="Hora do remédio"
                    defaultValue={med.description}
                    onChange={(e) => setTime(e.nativeEvent.text)}
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

export default MedForm;
