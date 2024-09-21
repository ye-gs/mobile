import React, { useState, useRef, useEffect } from "react";
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    TextInput,
    Button,
} from "react-native";
import { Exam } from "@/types/exam";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { Line } from "./charts/Line";

interface ExamTableProps {
    specificExam: Exam;
}

interface GroupedExams {
    [key: string]: {
        analito: string;
        resultado: string | number;
        unidade: string;
        valorReferencia: string;
    }[];
}

const ExamTable: React.FC<ExamTableProps> = ({ specificExam }) => {
    const { analitos, resultados, unidade, valoresReferencia, data } =
        specificExam;
    const { theme } = useTheme(); // Use the theme inside the component
    const [currentPage, setCurrentPage] = useState(0); // Track the current page
    const [searchQuery, setSearchQuery] = useState(""); // State for the search query
    const scrollViewRef = useRef<ScrollView>(null); // Ref for the ScrollView
    const [highlightIndex, setHighlightIndex] = useState<number | null>(null); // State to track highlighted index
    const [contentHeight, setContentHeight] = useState(0); // State to track the content height
    const { width } = Dimensions.get("window");

    const styles = StyleSheet.create({
        container: {
            alignSelf: "center",
            paddingHorizontal: 15, // Add padding to the sides of the screen
        },
        table: {
            width: "100%",
            marginTop: 30,
            paddingHorizontal: 15, // Ensure the table does not touch the edges
        },
        row: {
            flexDirection: "row",
            alignSelf: "center",
        },
        headerCell: {
            fontWeight: "bold",
            borderWidth: 1,
            padding: 10,
            textAlign: "center",
            backgroundColor: Colors[theme].headerBackground,
            color: Colors[theme].headerText,
        },
        cell: {
            borderWidth: 1,
            padding: 10,
            textAlign: "center",
            color: Colors[theme].text,
        },
        fixedCellWidth: {
            width: width * 0.225,
        },
        pageTitle: {
            textAlign: "center",
            fontSize: 22,
            fontWeight: "bold",
            marginVertical: 15,
            color: Colors[theme].primary,
            paddingHorizontal: 15, // Prevent touching the edges
        },
        paginationControls: {
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            marginVertical: 10,
        },
        searchInput: {
            marginTop: 20,
            borderWidth: 1,
            borderColor: Colors[theme].border,
            borderRadius: 25,
            padding: 10,
            color: Colors[theme].text,
            width: "90%",
            paddingHorizontal: 15, // Ensure padding on the sides
            alignSelf: "center",
        },
        highlightedRow: {
            backgroundColor: Colors[theme].circleBackground,
        },
        graphContainer: {
            marginVertical: 20,
            paddingHorizontal: 20, // Adjusted to prevent touching the edges
            alignItems: "center",
            alignSelf: "center",
        },
        graphTitle: {
            fontSize: 28,
            fontWeight: "bold",
            marginBottom: 20,
            color: Colors[theme].primary,
            paddingHorizontal: 15, // Additional padding
        },
        button: {
            borderRadius: 20,
            padding: 10,
        },
    });

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Conditional check
    if (!analitos || !resultados || !unidade || !valoresReferencia || !data) {
        return <Text>Dados insuficientes para renderizar a tabela</Text>;
    }

    const groupExamsByDate = (specificExam: Exam): GroupedExams => {
        const groupedExams: GroupedExams = {};

        for (let i = 0; i < specificExam.data.length; i++) {
            const timestamp = specificExam.data[i].seconds;

            // Add the exam to the corresponding date group
            if (!groupedExams[timestamp]) {
                groupedExams[timestamp] = [];
            }

            groupedExams[timestamp].push({
                analito: analitos[i],
                resultado: resultados[i] || "-",
                unidade: unidade[i] || "-",
                valorReferencia: valoresReferencia[i] || "-",
            });
        }

        return groupedExams;
    };

    // Group exams by date
    const groupedExams = groupExamsByDate(specificExam);
    const dateKeys = Object.keys(groupedExams).reverse(); // Get dates and sort them in reverse order

    // Function for page navigation
    const goToNextPage = () => {
        if (currentPage < dateKeys.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Exams of the current page (date)
    const currentExams = groupedExams[dateKeys[currentPage]];

    // Update the highlighted index when the search query changes
    useEffect(() => {
        const removeAccents = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (searchQuery.trim() === "") {
            setHighlightIndex(null); // Do not highlight anything if the search is empty
        } else {
            const normalizedQuery = removeAccents(searchQuery.toLowerCase());

            const index = currentExams.findIndex((exam) =>
                removeAccents(exam.analito.toLowerCase()).includes(
                    normalizedQuery
                )
            );

            setHighlightIndex(index >= 0 ? index : null);

            // Scroll to the found item
            if (index >= 0 && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    y: index * (1 / currentExams.length) * contentHeight, // Scroll to the item's position
                    animated: true,
                });
            }
        }
    }, [searchQuery, currentExams, contentHeight]);

    return (
        <View style={styles.container}>
            <View style={styles.graphContainer}>
                <Text style={styles.graphTitle}>
                    Gráfico de {currentExams[highlightIndex || 0]?.analito}
                </Text>
                <Line
                    exam={specificExam}
                    analito={currentExams[highlightIndex || 0]?.analito}
                    lineStyle={{
                        strokeWidth: 2,
                        stroke: Colors[theme].graphLine,
                    }}
                    dotStyle={{ fill: Colors[theme].graphDot }}
                    backgroundGradientFrom={
                        Colors[theme].backgroundGradientFrom
                    }
                    backgroundGradientTo={Colors[theme].backgroundGradientTo}
                />
            </View>
            <View>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Pesquisar Analito..."
                    placeholderTextColor={Colors[theme].textSecondary}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <ScrollView
                style={{ flex: 1 }}
                ref={scrollViewRef}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    setContentHeight(contentHeight); // Set the total content height
                }}
            >
                <Text style={styles.pageTitle}>
                    Data do exame {formatDate(Number(dateKeys[currentPage]))}
                </Text>

                <View style={styles.table}>
                    {/* Header */}
                    <View style={styles.row}>
                        <Text
                            style={[styles.headerCell, styles.fixedCellWidth]}
                        >
                            Analito
                        </Text>
                        <Text
                            style={[styles.headerCell, styles.fixedCellWidth]}
                        >
                            Resultado
                        </Text>
                        <Text
                            style={[styles.headerCell, styles.fixedCellWidth]}
                        >
                            Unidade
                        </Text>
                        <Text
                            style={[styles.headerCell, styles.fixedCellWidth]}
                        >
                            Valores de Referência
                        </Text>
                    </View>

                    {/* Body */}
                    {currentExams.map((exam, index) => (
                        <View
                            key={index}
                            style={[
                                styles.row,
                                highlightIndex === index &&
                                    styles.highlightedRow,
                            ]}
                        >
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {exam.analito}
                            </Text>
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {exam.resultado}
                            </Text>
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {exam.unidade}
                            </Text>
                            <Text style={[styles.cell, styles.fixedCellWidth]}>
                                {exam.valorReferencia}
                            </Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Pagination */}
            <View style={styles.paginationControls}>
                <Button
                    title="Anterior"
                    onPress={goToPreviousPage}
                    disabled={currentPage === 0}
                    color={Colors[theme].primary}
                />
                <Button
                    title="Próximo"
                    onPress={goToNextPage}
                    disabled={currentPage === dateKeys.length - 1}
                    color={Colors[theme].primary}
                />
            </View>
        </View>
    );
};

export default ExamTable;
