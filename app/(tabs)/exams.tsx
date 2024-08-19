import React from "react";
import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Exams = () => {
    const [selectedFileUri, setSelectedFileUri] = React.useState<string | null>(
        null
    );
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedFileName, setSelectedFileName] = React.useState<
        string | null
    >(null);
    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "application/pdf",
        });
        if (!result.canceled) {
            setSelectedFileUri(result.assets[0]?.uri);
            setSelectedFileName(result.assets[0]?.name);
        }
    };

    const sendData = async () => {
        setLoading(true);
        if (!selectedFileUri) {
            return;
        }
        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem("@app:session");

            const uploadTask = FileSystem.createUploadTask(
                "https://send-exam-uoy6brlebq-rj.a.run.app/",
                selectedFileUri,
                {
                    headers: {
                        "Content-Type": "application/pdf",
                        Authorization: "Bearer " + token,
                    },
                }
            );

            const response = await uploadTask.uploadAsync();
            if (response?.status !== 200) {
                setLoading(false);

                alert("Erro ao enviar arquivo " + response?.body);
            }
            setLoading(false);
            alert("Arquivo enviado com sucesso");
        } catch (e) {
            setLoading(false);
            const error = e as Error;
            console.log(error);
            console.log(error.toString());
            alert("Erro ao enviar arquivo " + error.message);
            console.log(error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Button onPress={pickDocument} mode="contained">
                Inserir documento
            </Button>
            {selectedFileUri && (
                <Button loading={loading} mode="contained" onPress={sendData}>
                    Enviar
                </Button>
            )}
            {selectedFileName && (
                <View>
                    <Text> Arquivo selecionado: {selectedFileName}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Exams;
