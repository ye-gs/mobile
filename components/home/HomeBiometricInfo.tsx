import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { getExamsFromCache } from "@/cache/index";
import { auth, db as firestore } from "@/firebase/index";
import { BiometricModal } from "@/components/BiometricModal";
import AnalitosModel from "@/components/home/AnalitosModel";
import { GenericAnalitosButton } from "@/components/GenericAnalitosButton";
import { AnalitoInfo } from "@/components/searchItem";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";
const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
type FontAwesomeIconNames = keyof typeof FontAwesome.glyphMap;

interface IExam {
    ANALITOS: string[];
    DATA: string;
    RESULTADOS: string;
}

export function HomeBiometricInfo() {
    const { theme } = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedAnalyte, setSelectedAnalyte] = useState<string | null>(null);
    const [exams, setExams] = useState<IExam[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const [buttonData, setButtonData] = useState<{ analito: string | undefined; measure: string | undefined; unidade: string | undefined; icon: FontAwesomeIconNames }[]>([
        { analito: undefined, measure: undefined, unidade: undefined, icon: "heart" },
        { analito: undefined, measure: undefined, unidade: undefined, icon: "heart" },
        { analito: undefined, measure: undefined, unidade: undefined, icon: "heart" },
    ]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#f5f5f5",
            padding: 20,
        },
        card: {
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 4,
        },
        cardText: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
        },
        biometricInfo: {
            flexDirection: "row",
            gap: RFValue(18, 808),
            paddingTop: "8%",
        },
        fullscreenPopupContainer: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            height: "100%",
        },
    });

    const loadButtonData = useCallback(async () => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            try {
                const docRef = doc(
                    firestore,
                    `users/${userId}/favAnalitos/dados` // Mudança aqui
                );
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data().analitos || [];
                    setButtonData(
                        data.length > 0
                            ? data
                            : [
                                  {
                                      analito: null,
                                      measure: null,
                                      unidade: null,
                                      icon: "heart",
                                  },
                                  {
                                      analito: null,
                                      measure: null,
                                      unidade: null,
                                      icon: "heart",
                                  },
                                  {
                                      analito: null,
                                      measure: null,
                                      unidade: null,
                                      icon: "heart",
                                  },
                              ]
                    );
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching button data:", error);
            }
        }
    }, []);

    useEffect(() => {
        loadButtonData();
    }, [loadButtonData]);

    const loadExams = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        loadExams();
    }, [auth.currentUser?.uid, loadExams]);

    const handleAddBiometric = useCallback((buttonIndex: number) => {
        setSelectedButton(buttonIndex);
        setModalVisible(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalVisible(false);
    }, []);

    const handleAnalytePress = useCallback((analyte: string) => {
        setSelectedAnalyte(analyte);
        setPopupVisible(true);
    }, []);

    const closePopup = useCallback(() => {
        setPopupVisible(false);
        setSelectedAnalyte(null);
    }, []);

    const handleAnalyteSelect = useCallback(
        async (analitoInfo: AnalitoInfo) => {
            if (selectedButton !== null) {
                const updatedButtonData = [...buttonData];
                updatedButtonData[selectedButton] = {
                    ...updatedButtonData[selectedButton],
                    analito: analitoInfo.analitos,
                    measure: analitoInfo.resultado,
                    unidade: analitoInfo.unidade,
                };

                setButtonData(updatedButtonData);
                setPopupVisible(false);
                setModalVisible(false);
                setSelectedAnalyte(null);

                const userId = auth.currentUser?.uid;
                if (userId) {
                    try {
                        const docRef = doc(
                            firestore,
                            `users/${userId}/favAnalitos/dados` // Mudança aqui
                        );
                        await setDoc(docRef, { analitos: updatedButtonData });
                    } catch (error) {
                        console.error("Erro ao salvar no Firestore:", error);
                        setError("Erro ao salvar dados no Firestore");
                    }
                }
            }
        },
        [selectedButton, buttonData]
    );

    const analytes = useMemo(() => {
        return [...new Set(exams.flatMap((exam) => exam.ANALITOS))].filter(
            (analyte) =>
                removeAccents(analyte.toLowerCase()).includes(
                    removeAccents(searchTerm.toLowerCase())
                )
        );
    }, [exams, searchTerm]);

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
        return <Text>Carregando...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <View style={styles.biometricInfo}>
            {buttonData.map((button, index) => (
                <GenericAnalitosButton
                    key={index}
                    analito={button.analito}
                    measure={button.measure}
                    unidade={button.unidade}
                    iconName={button.icon}
                    onPress={() => handleAddBiometric(index)}
                />
            ))}

            <BiometricModal
                modalVisible={modalVisible}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                analytes={analytes}
                handleCloseModal={handleCloseModal}
                renderItem={renderItem}
                loading={loading}
            />

            <Modal
                transparent={true}
                visible={popupVisible}
                onRequestClose={closePopup}
                animationType="slide"
            >
                <View style={styles.fullscreenPopupContainer}>
                    <AnalitosModel
                        selectedAnalyte={selectedAnalyte || ""}
                        onClose={closePopup}
                        onSelect={handleAnalyteSelect}
                    />
                </View>
            </Modal>
        </View>
    );
}
