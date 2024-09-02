import React from "react";
import { View, ScrollView, Text, StyleSheet,Dimensions } from "react-native";
import { Exam } from "@/types/exam";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";

interface ExamTableProps {
    specificExam: Exam;
}

const ExamTable: React.FC<ExamTableProps> = ({ specificExam }) => {
    const { analitos, resultados, unidade, valoresReferencia } = specificExam;
    const { theme } = useTheme(); // Use the theme inside the component

    // Verificação condicional
    if (!analitos || !resultados || !unidade || !valoresReferencia) {
        return <Text>Dados insuficientes para renderizar a tabela</Text>;
    }

    return (
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.table}>
                    {/* Header */}
                    <View style={styles.row}>
                        <Text
                            style={[
                                styles.headerCell,
                                styles.fixedCellWidth,
                                {
                                    backgroundColor:
                                        Colors[theme].circleBackground,
                                }, // Use the theme color
                            ]}
                        >
                            Analito
                        </Text>
                        <Text
                            style={[
                                styles.headerCell,
                                styles.fixedCellWidth,
                                {
                                    backgroundColor:
                                        Colors[theme].circleBackground,
                                }, // Use the theme color
                            ]}
                        >
                            Resultado
                        </Text>
                        <Text
                            style={[
                                styles.headerCell,
                                styles.fixedCellWidth,
                                {
                                    backgroundColor:
                                        Colors[theme].circleBackground,
                                }, // Use the theme color
                            ]}
                        >
                            Unidade
                        </Text>
                        <Text
                            style={[
                                styles.headerCell,
                                styles.fixedCellWidth,
                                {
                                    backgroundColor:
                                        Colors[theme].circleBackground,
                                }, // Use the theme color
                            ]}
                        >
                            Valores de Referência
                        </Text>
                    </View>

                    {/* Body */}
                    {analitos.map((analito, index) => (
                        <View key={index} style={styles.row}>
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {analito}
                            </Text>
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {resultados[index] || "-"}
                            </Text>
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {unidade[index] || "-"}
                            </Text>
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {valoresReferencia[index] || "-"}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
    
    );
};
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    table: {
        width: "90%",
        marginTop: 30,
        alignSelf: "center",
    },
    row: {
        flexDirection: "row",
        alignSelf: "center",
    },
    headerCell: {
        fontWeight: "bold",
        borderWidth: 1,
        padding: 8,
        textAlign: "center",
    },
    cell: {
        borderWidth: 1,
        padding: 8,
        textAlign: "center",
    },
    fixedCellWidth: {
        width: width * 0.225,
    },
});

export default ExamTable;
