import React, { useEffect, useState, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { GetItemInfo, AnalitoInfo } from "@/components/searchItem";
import { RFValue } from "react-native-responsive-fontsize";
import debounce from "lodash.debounce";

interface AnalitosProps {
    selectedAnalyte: string;
    onClose: () => void;
    onSelect: (analitoInfo: AnalitoInfo) => void;
}

const AnalitosModel: React.FC<AnalitosProps> = ({
    selectedAnalyte,
    onClose,
    onSelect,
}) => {
    const [analitoInfo, setAnalitoInfo] = useState<AnalitoInfo[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [debouncedText, setDebouncedText] = useState<string>("");

    const filters = {
        analito: true,
        resultado: true,
        unidade: true,
        valorReferencia: true,
        seconds: true,
    };

    const [customMeasure, setCustomMeasure] = useState<AnalitoInfo>({
        analyteIndex: 0,
        examIndex: 0,
        seconds: undefined,
        resultado: "",
        unidade: "",
        analitos: selectedAnalyte,
    });

    // Carregar dados do analito
    useEffect(() => {
        const fetchData = async () => {
            const data = await GetItemInfo(selectedAnalyte, filters);
            setAnalitoInfo(data);
        };
        fetchData();
    }, [selectedAnalyte]);

    // Definir a unidade inicial do analito ao carregar dados
    useEffect(() => {
        if (analitoInfo.length > 0) {
            setCustomMeasure((prev) => ({
                ...prev,
                unidade: analitoInfo[0].unidade,
            }));
        }
    }, [analitoInfo]);

    const debouncedCustomMeasureChange = useCallback(
        debounce((value: string) => {
            setDebouncedText(value);
        }, 500),
        []
    );

    useEffect(() => {
        return () => {
            debouncedCustomMeasureChange.cancel();
        };
    }, [debouncedCustomMeasureChange]);

    const handleUseLatest = () => {
        if (analitoInfo.length > 0) {
            const sortedAnalitoInfo = [...analitoInfo].sort((a, b) => {
                if (a.seconds && b.seconds) {
                    return Number(b.seconds) - Number(a.seconds);
                }
                return 0;
            });
            setSelectedIndex(0);
            onSelect(sortedAnalitoInfo[0]);
        }
    };

    const handleCustomMeasureSubmit = () => {
        if (customMeasure?.resultado?.trim()) {
            // Call onSelect with the custom measure
            onSelect(customMeasure);
            // Optionally, reset the custom measure input
            setCustomMeasure((prev) => ({ ...prev, resultado: "" }));
        }
    };

    const filteredAnalitoInfo = analitoInfo.filter(
        (item) => item.resultado !== null && item.resultado !== undefined
    );

    const renderAnalitoItem = useCallback(
        ({ item, index }: { item: AnalitoInfo; index: number }) => (
            <TouchableOpacity
                style={[
                    styles.card,
                    selectedIndex === index && styles.selectedCard,
                ]}
                onPress={() => {
                    setSelectedIndex(index);
                    setCustomMeasure((prev) => ({
                        ...prev,
                        unidade: item.unidade,
                    }));
                    onSelect(item);
                }}
            >
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>
                        {item.resultado} {item.unidade}
                    </Text>
                    <Text style={styles.cardDate}>
                        {item.seconds?.toLocaleString()}
                    </Text>
                </View>
            </TouchableOpacity>
        ),
        [selectedIndex]
    );

    const ListHeader = (
        <TouchableOpacity
            onPress={handleCustomMeasureSubmit}
            style={styles.card} // Adding the same styles for consistency
        >
            <View style={styles.customTextContainer}>
                <TextInput
                    style={styles.inputCardText}
                    placeholder="Medida personalizada"
                    value={customMeasure.resultado}
                    onChangeText={(text) => {
                        setCustomMeasure((prev) => ({
                            ...prev,
                            resultado: text,
                        }));
                        debouncedCustomMeasureChange(text);
                    }}
                    inputMode="numeric"
                />
                <Text style={styles.unidade}>{customMeasure.unidade}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={styles.container}
        >
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Analito Selecionado</Text>
                <Text style={styles.analitoName}>{selectedAnalyte}</Text>
                <TouchableOpacity onPress={handleUseLatest}>
                    <Text style={styles.link}>Usar mais recente</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={filteredAnalitoInfo}
                scrollEnabled={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAnalitoItem}
                contentContainerStyle={styles.listContainer}
                style={styles.flatList}
                ListHeaderComponent={ListHeader}
                keyboardShouldPersistTaps="handled"
            />

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const colors = {
    primary: "#333",
    secondary: "#fff",
    background: "#f5f5f5",
    cardBackground: "#fff",
    cardBorder: "#ddd",
    buttonBackground: "#007BFF",
    buttonText: "#FFF",
    closeButtonBackground: "#FF0000",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 0,
        borderTopEndRadius: RFValue(20, 808),
        borderTopStartRadius: RFValue(20, 808),
        width: "95%",
        marginTop: RFValue(20, 808),
    },
    widthContainer: {
        width: "95%",
        alignSelf: "center",
        marginTop: RFValue(25, 808),
    },
    headerContainer: {
        marginTop: RFValue(22, 808),
        marginBottom: RFValue(20, 808),
    },
    title: {
        fontSize: RFValue(26),
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
    },
    header: {
        justifyContent: "space-around",
        marginBottom: RFValue(10, 808),
        marginTop: RFValue(10, 808),
        alignItems: "center",
    },
    link: {
        fontSize: RFValue(16, 808),
        color: colors.buttonBackground,
        textAlign: "center",
        padding: 5,
        borderColor: colors.buttonBackground,
        borderWidth: 1,
        borderRadius: RFValue(10, 808),
        marginTop: RFValue(10, 808),
        width: "90%",
        alignSelf: "center",
    },
    analitoName: {
        fontSize: RFValue(22, 808),
        color: colors.primary,
        textAlign: "center",
        fontWeight: "bold",
    },
    flatList: {
        flex: 1,
        width: "100%",
    },
    listContainer: {
        paddingBottom: RFValue(20, 808),
        paddingHorizontal: RFValue(10, 808),
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: RFValue(10, 808),
        padding: RFValue(20, 808),
        marginVertical: RFValue(10, 808),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        width: "100%",
    },
    selectedCard: {
        borderColor: colors.buttonBackground,
        borderWidth: 2,
    },
    checkboxAndTextContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    textContainer: {
        flex: 1,
    },
    customTextContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Alinha os itens ao longo do eixo principal
    },
    cardText: {
        fontSize: RFValue(22, 808),
        fontWeight: "bold",
        color: colors.primary,
    },
    inputCardText: {
        fontSize: RFValue(19, 808),
        fontWeight: "bold",
        color: colors.primary,
        borderWidth: 1,
        padding: RFValue(10, 808),
        borderColor: colors.primary,
        borderRadius: RFValue(10, 808),
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
        backgroundColor: colors.secondary,
        flex: 1, // Permite que o TextInput ocupe espaço disponível
        marginRight: RFValue(10, 808), // Espaço entre o TextInput e a unidade
    },
    unidade: {
        marginTop: 10,
        fontSize: RFValue(16, 808),
        color: colors.primary,
        fontWeight: "bold",
    },
    cardDate: {
        marginTop: 10,
        fontSize: RFValue(16, 808),
        color: colors.primary,
    },
    closeButton: {
        backgroundColor: colors.buttonBackground,
        borderRadius: RFValue(20, 808),
        paddingVertical: RFValue(15, 808),
        alignItems: "center",
        alignSelf: "center",
        marginVertical: RFValue(20, 808),
        width: "90%",
    },
    closeButtonText: {
        color: colors.buttonText,
        fontSize: RFValue(18, 808),
        fontWeight: "bold",
    },
});

export default AnalitosModel;
