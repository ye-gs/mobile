import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { getExamsFromCache } from "@/cache/index"; // Importar a função de cache
import { auth } from "@/firebase/index";
import { AddButton } from "@/components/AddButton";
import { BiometricModal } from "@/components/BiometricModal";
import { Exam } from "@/types/exam";
import AnalitosModel from "@/components/home/AnalitosModel";

interface IExam {
    ANALITOS: string[];
    DATA: string;
    RESULTADOS: string;
}

export function HomeBiometricInfo() {
    const { theme } = useTheme() as { theme: string };
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false); // Estado para controlar o popup
    const [selectedAnalyte, setSelectedAnalyte] = useState<string | null>(null); // Guardar o analito selecionado
    const [exams, setExams] = useState<IExam[]>([]);
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

    const handleAnalytePress = (analyte: string) => {
        setSelectedAnalyte(analyte); // Define o analito selecionado
        setPopupVisible(true); // Mostra o popup
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedAnalyte(null); // Limpa o analito selecionado ao fechar o popup
    };

    const handleAnalyteSelect = () => {
        // Função para ser chamada quando o usuário confirma a seleção de um analito
        setPopupVisible(false); // Fecha o popup
        setModalVisible(false); // Fecha o modal principal
        setSelectedAnalyte(null); // Limpa o analito selecionado
    };

    const renderItem = ({ item }: { item: string }) => (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.card]}
                onPress={() => handleAnalytePress(item)}
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
            <BiometricModal
                modalVisible={modalVisible}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                analytes={analytes}
                handleCloseModal={handleCloseModal}
                renderItem={renderItem}
                loading={loading}
            />

            {/* Modal de popup para o analito selecionado */}
            <Modal
                transparent={true}
                visible={popupVisible}
                onRequestClose={closePopup}
                animationType="slide"
            >
                <View style={styles.fullscreenPopupContainer}>
                    <AnalitosModel
                        selectedAnalyte={selectedAnalyte || ""}
                        onClose={closePopup} // Fechar apenas o popup
                        onSelect={handleAnalyteSelect} // Selecionar e fechar ambos os modals
                    />
                </View>
            </Modal>
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
    cardText: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
    },
    biometricInfo: {
        flexDirection: "row",
        gap: RFValue(18, 808),
        paddingTop: "8%",
    },
    fullscreenPopupContainer: {
        flex: 1, // Ocupa toda a altura
        justifyContent: "center", // Centraliza verticalmente
        alignItems: "center", // Centraliza horizontalmente
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo semi-transparente para o modal
        width: "100%", // Ocupa toda a largura
        height: "100%", // Ocupa toda a altura
    },
    closeButton: {
        backgroundColor: colors.buttonBackground,
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: colors.buttonText,
        fontSize: 16,
    },
});
