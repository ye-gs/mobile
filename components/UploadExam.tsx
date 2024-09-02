import React, { useEffect } from "react";
import { View, Text } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Exam } from "@/types/exam";
import { useExams } from "@/hooks/exams";
import ExamTable from "@/components/ExamTable";

const ExamUpload = (exam: Exam) => {

    const { exams, getExamById } = useExams();
    const [specificExam, setSpecificExam] = React.useState<Exam | null>(null);
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
    useEffect(() => {
        if (exams.length > 0) {
            const foundExam = getExamById(exam.slug);
            console.log("Specific Exam:", foundExam?.id);

            if (foundExam) {
                setSpecificExam(foundExam);
            } else {
                console.log("No exam found with the given slug.");
            }
        } else {
            console.log("Exams list is empty.");
        }
    }, [exams, exam]);

    if (!exam) {
        return <div>Loading...</div>;
    }
    const sendData = async () => {
        setLoading(true);
        if (!selectedFileUri) {
            return;
        }
        try {
            // Retrieve the token from AsyncStorage
            const token = await AsyncStorage.getItem("@app:session");

            const uploadTask = FileSystem.createUploadTask(
                Constants.expoConfig?.extra?.examFunctionUrl || "",
                selectedFileUri,
                {
                    headers: {
                        "Content-Type": "application/pdf",
                        Authorization: "Bearer " + token,
                    },
                }
            );

            const response = await uploadTask.uploadAsync();
            setLoading(false);
            if (response?.status !== 200) {
                alert("Erro ao enviar arquivo " + response?.body);
            }
            alert("Arquivo enviado com sucesso");
        } catch (e) {
            const error = e as Error;
            console.log(error);
            console.log(error.toString());
            alert("Erro ao enviar arquivo " + error.message);
            console.log(error.message);
        }
    };
    return (
        <View style={styles.container}>
            {exam.slug === "new" ? (
                <>
                    <Text style={styles.text}>Upload de exame</Text>
                    <Button onPress={pickDocument} mode="contained">
                        Inserir documento
                    </Button>
                    {selectedFileUri && (
                        <Button
                            loading={loading}
                            mode="contained"
                            onPress={sendData}
                        >
                            Enviar
                        </Button>
                    )}
                    {selectedFileName && (
                        <View>
                            <Text>Arquivo selecionado: {selectedFileName}</Text>
                        </View>
                    )}
                </>
            ) : (
                <>
                    {specificExam && (
                        <ExamTable specificExam={specificExam!} />
                        
                    )}
                </>
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

export default ExamUpload;
