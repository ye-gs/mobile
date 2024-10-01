import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { GetItemInfo, AnalitoInfo } from "@/components/searchItem";
import { RFValue } from "react-native-responsive-fontsize";

interface AnalitosProps {
    selectedAnalyte: string;
    onClose: () => void; // Nova prop para controlar o fechamento
    onSelect: () => void; // Nova prop para controlar a seleção
}

const AnalitosModel: React.FC<AnalitosProps> = ({
    selectedAnalyte,
    onClose,
    onSelect,
}) => {
    const [analitoInfo, setAnalitoInfo] = useState<AnalitoInfo[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetItemInfo(selectedAnalyte);
            setAnalitoInfo(data);
        };

        fetchData();
    }, [selectedAnalyte]);

    const handleUseLatest = () => {
        if (analitoInfo.length > 0) {
            const sortedAnalitoInfo = [...analitoInfo].sort((a, b) => {
                if (a.seconds && b.seconds) {
                    return Number(b.seconds) - Number(a.seconds);
                }
                return 0;
            });
            setSelectedIndex(0);
            console.log(
                `Usando o item mais recente: ${sortedAnalitoInfo[0].resultado}`
            );
            onSelect(); // Fechar o modelo
        }
    };

    const renderAnalitoItem = ({
        item,
        index,
    }: {
        item: AnalitoInfo;
        index: number;
    }) => (
        <TouchableOpacity
            style={[
                styles.card,
                selectedIndex === index && styles.selectedCard,
            ]}
            onPress={() => {
                setSelectedIndex(index);
                console.log(item.resultado);
                onSelect(); // Fechar o modelo
            }}
        >
            <View style={styles.checkboxAndTextContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText}>
                        {item.resultado} {item.unidade}
                    </Text>
                    <Text style={styles.cardDate}>
                        {item.seconds?.toLocaleString()}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, styles.widthContainer]}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Analito Selecionado</Text>
                </View>
                <View style={styles.header}>
                    <Text style={styles.analitoName}>{selectedAnalyte}</Text>
                    <TouchableOpacity onPress={handleUseLatest}>
                        <Text style={styles.link}>Usar mais recente</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={analitoInfo.filter(
                        (item) =>
                            item.resultado !== null &&
                            item.resultado !== undefined
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderAnalitoItem}
                    contentContainerStyle={styles.listContainer}
                    style={styles.flatList}
                />

                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                    <Text style={styles.closeButtonText}>Fechar</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        borderRadius: 20,
    },
    widthContainer: {
        width: "95%",
        alignSelf: "center",
        marginTop: 25,
    },
    headerContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    title: {
        fontSize: RFValue(26), // Use RFValue for responsive font size
        fontWeight: "bold",
        color: colors.primary,
        textAlign: "center",
    },
    header: {
        justifyContent: "space-around",
        marginBottom: 10,
        marginTop: 10,
        alignItems: "center",
    },
    link: {
        fontSize: RFValue(16), // Use RFValue for responsive font size
        color: colors.buttonBackground,
        textAlign: "center",
        padding: 5,
        borderColor: colors.buttonBackground,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        width: "90%",
    },
    analitoName: {
        fontSize: RFValue(22), // Use RFValue for responsive font size
        color: colors.primary,
        textAlign: "center",
        fontWeight: "bold",
    },
    flatList: {
        flex: 1,
        width: "100%",
    },
    listContainer: {
        paddingBottom: 40,
        paddingHorizontal: 10,
    },
    card: {
        backgroundColor: colors.cardBackground,
        borderRadius: 10,
        padding: 20,
        marginVertical: 10,
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
        fontSize: RFValue(18), // Use RFValue for responsive font size
        fontWeight: "bold",
        color: colors.primary,
    },
    cardDate: {
        marginTop: 10,
        fontSize: RFValue(16), // Use RFValue for responsive font size
        color: colors.primary,
    },
    closeButton: {
        backgroundColor: colors.buttonBackground,
        borderRadius: 20,
        paddingVertical: 15,
        alignItems: "center",
        alignSelf: "center",
        marginVertical: 20,
        width: "90%",
    },
    closeButtonText: {
        color: colors.buttonText,
        fontSize: RFValue(18),
        fontWeight: "bold",
    },
});

export default AnalitosModel;
