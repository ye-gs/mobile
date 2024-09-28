import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { getExamsFromCache } from "@/cache/index"; // Importar a função de cache
import { auth } from "@/firebase/index";
import { AddButton } from "@/components/AddButton";
import { BiometricModal } from "@/components/BiometricModal";
import { router } from "expo-router";
import { Exam } from "@/types/exam";
interface IExam {
    ANALITOS: string[];
    DATA: string;
    RESULTADOS: string;
}
export function HomeBiometricInfo() {
    const { theme } = useTheme() as { theme: string };
    const [modalVisible, setModalVisible] = useState(false);
    const [exams, setExams] = useState<IExam[]>([]);//Todo: add type
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de busca

    // Função para carregar os exames do cache
    const loadExams = async () => {
        setLoading(true);
        setError(null);
        try {
            const userId = auth.currentUser?.uid ?? "";
            if (!userId) {
                throw new Error("Usuário não autenticado");
            }
            const cachedExams = await getExamsFromCache(userId);
            if (Array.isArray(cachedExams)) {
                setExams(cachedExams);
            } else {
                throw new Error("Dados de exames inválidos");
            }
        } catch (err) {
            console.error(err);
            setError("Erro ao carregar exames do cache");
        } finally {
            setLoading(false);
        }
    };

    // Carregar exames ao montar o componente e sempre que o usuário mudar
    useEffect(() => {
        loadExams();
    }, [auth.currentUser?.uid]);

    const handleAddBiometric = () => {
        setModalVisible(true);
        // Recarregar os exames ao abrir o modal para garantir que estão atualizados
        loadExams();
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.card]}
                onPress={() => {
                    console.log("Selected analyte:", item); // Log apenas o nome do item
                    handleCloseModal(); // Fechar o modal após a seleção
                    router.push({
                        pathname: "/analitos",
                        params: { analitoName: item },
                    });
                }}
            >
                <Text style={styles.cardText}>{item}</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <Text>Carregando...</Text>; // Exibir mensagem de carregamento
    }

    if (error) {
        return <Text>{error}</Text>; // Exibir mensagem de erro
    }

    // Função para remover acentuação
    const removeAccents = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    // Flatten the list of analytes and filter by the search term
    const analytes = [
        ...new Set(exams.flatMap((exam) => exam.ANALITOS)),
    ].filter((analyte) =>
        removeAccents(analyte.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase())
        )
    );

    return (
        <View style={styles.biometricInfo}>
            <AddButton theme={theme} onPress={handleAddBiometric} />
            <View style={styles.verticalSeparator} />
            <AddButton theme={theme} onPress={handleAddBiometric} />
            <View style={styles.verticalSeparator} />
            <AddButton theme={theme} onPress={handleAddBiometric} />
            <BiometricModal
                modalVisible={modalVisible}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                analytes={analytes}
                handleCloseModal={handleCloseModal}
                renderItem={renderItem}
                loading={loading}
            />
        </View>
    );
}

// Stylesheet já fornecido por você
const colors = {
    primary: "#333",
    secondary: "#fff",
    background: "#f5f5f5",
    cardBackground: "#fff",
    cardBorder: "#ddd",
    buttonBackground: "#007BFF",
    buttonText: "#FFF",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    headerContainer: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: colors.primary,
    },
    link: {
        fontSize: 16,
        color: colors.buttonBackground,
    },
    analitoName: {
        fontSize: 22,
        color: colors.primary,
        marginBottom: 20,
        textAlign: "center",
    },
    listContainer: {
        paddingBottom: 40,
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4, // Shadow for Android
    },
    selectedCard: {
        borderColor: colors.buttonBackground,
        borderWidth: 2,
    },
    checkboxAndTextContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxContainer: {
        marginRight: 15,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    checkboxFilled: {
        width: 12,
        height: 12,
        backgroundColor: colors.primary,
    },
    textContainer: {
        flex: 1,
    },
    cardText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
    },
    cardDate: {
        marginTop: 10,
        fontSize: 16,
        color: colors.primary,
    },
    biometricInfo: {
        flexDirection: "row",
        gap: RFValue(18, 808),
        paddingTop: "8%",
    },
    verticalSeparator: {
        width: RFValue(1.5, 808),
        height: "80%",
        alignSelf: "center",
        backgroundColor: colors.primary, // Adicionar cor à separação
    },
    cadastroContainer: {
        alignItems: "center",
        padding: 10,
    },
    cadastroTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 10,
    },
});
