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
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";

interface ExamTableProps {
    specificExam: Exam;
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
        pageTitle: {
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            marginVertical: 10,
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
            color: Colors[theme].text, // Use the theme color
            width: "100%",
        },
        highlightedRow: {
            backgroundColor: Colors[theme].circleBackground, // Color for the highlighted row
        },
    });

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Verificação condicional
    if (!analitos || !resultados || !unidade || !valoresReferencia || !data) {
        return <Text>Dados insuficientes para renderizar a tabela</Text>;
    }
    // Function to group exams by unique dates
    const groupExamsByDate = (specificExam: Exam) => {
        const groupedExams: { [key: string]: any[] } = {};

        for (let i = 0; i < specificExam.data.length; i++) {
            const timestamp = specificExam.data[i].seconds;

            // Adiciona o exame ao grupo da data correspondente
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

    // Group the exams by date
    const groupedExams = groupExamsByDate(specificExam);
    const dateKeys = Object.keys(groupedExams).reverse(); // Get unique dates (pages) and reverse them

    // Function to navigate between pages
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

    // Get exams for the current page (date)
    const currentExams = groupedExams[dateKeys[currentPage]];

    // Atualiza o índice destacado ao modificar a consulta de pesquisa
    useEffect(() => {
        const removeAccents = (str: string) =>
            str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (searchQuery.trim() === "") {
            setHighlightIndex(null); // Não destaque nada se a pesquisa estiver vazia
        } else {
            const normalizedQuery = removeAccents(searchQuery.toLowerCase());

            const index = currentExams.findIndex((exam) =>
                removeAccents(exam.analito.toLowerCase()).includes(
                    normalizedQuery
                )
            );

            setHighlightIndex(index >= 0 ? index : null);

            // Rolar para o item encontrado
            if (index >= 0 && scrollViewRef.current) {
                scrollViewRef.current.scrollTo({
                    y: index * (1 / currentExams.length) * contentHeight, // Scroll to the item's position
                    animated: true,
                });
            }
        }
    }, [searchQuery, currentExams]);
    return (
        <View>
            <Line
                exam={specificExam}
                analito={currentExams[highlightIndex || 0]?.analito}
            />
            {/* Barra de pesquisa */}
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
                    setContentHeight(contentHeight); // Define a altura total do conteúdo
                }}
            >
                <Text style={styles.pageTitle}>
                    Exames de {formatDate(Number(dateKeys[currentPage]))}
                </Text>

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
                                },
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
                                },
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
                                },
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
                                },
                            ]}
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
                                    styles.highlightedRow, // Highlight the row if it matches
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

            {/* Pagination Controls */}
            <View style={styles.paginationControls}>
                <Button
                    title="Anterior"
                    onPress={goToPreviousPage}
                    disabled={currentPage === 0}
                    color={Colors[theme].tint}
                />
                <Text>
                    {currentPage + 1} de {dateKeys.length}
                </Text>
                <Button
                    title="Próximo"
                    onPress={goToNextPage}
                    disabled={currentPage === dateKeys.length - 1}
                    color={Colors[theme].tint}
                />
            </View>
        </View>
    );
};

export default ExamTable;
