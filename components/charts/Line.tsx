import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { LineChartData } from "react-native-chart-kit/dist/line-chart/LineChart";
import { Exam } from "@/types/exam";
import { Text } from "@/components/Themed";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";

const screenWidth = Dimensions.get("window").width;

interface LineProps {
    exam: Exam;

    analito: string;

    lineStyle: {
        strokeWidth: number;

        stroke: string;
    };

    dotStyle: {
        fill: string;
    };

    backgroundGradientFrom: string;

    backgroundGradientTo: string;
}

export const Line = (props: LineProps) => {
    const { exam, analito } = props;
    const { theme } = useTheme();
    // Find all indices of the analito
    const analitoIndices = exam.analitos.reduce((indices, item, index) => {
        if (item === analito) {
            indices.push(index);
        }
        return indices;
    }, [] as number[]);

    // Extract the corresponding resultados and dates
    const resultados = analitoIndices.map((index) => exam.resultados[index]);
    const dates = analitoIndices.map((index) =>
        new Date(exam.data[index].seconds * 1000).getTime()
    );

    // Verificação condicional
    if (
        analitoIndices.length === 0 ||
        resultados.length === 0 ||
        dates.length === 0
    ) {
        return <Text>No data available for the selected analito</Text>;
    }
    const results = resultados.map((result) => {
        if (!isNaN(result)) {
            return result;
        } else return 0;
    });
    let limiteInferior = exam.limInferior[analitoIndices[0]];
    if (isNaN(limiteInferior)) limiteInferior = 0;
    let limiteSuperior = exam.limSuperior[analitoIndices[0]];
    if (isNaN(limiteSuperior)) limiteSuperior = 0;
    const chartData: LineChartData = {
        labels: dates.map((date) =>
            new Date(date)
                .toLocaleDateString()
                .split("/")
                .splice(1)
                .reverse()
                .join("-")
        ), // Convert timestamps to readable dates
        legend: [
            `${analito} (${exam.unidade[analitoIndices?.[0]] || ""})`,
            `Lim. Inf.`,
            `Lim. Sup.`,
        ],

        datasets: [
            {
                data: results,
                strokeWidth: 2,
                color: (opacity = 1) => Colors[theme].primaryLighter,
            },
            {
                data: Array(results.length).fill(limiteInferior),
                strokeWidth: 2,
                color: (opacity = 1) => Colors[theme].danger,
            },
            {
                data: Array(results.length).fill(limiteSuperior),
                strokeWidth: 2,
                color: (opacity = 1) => Colors[theme].danger,
            },
        ],
    };
    return (
        <View>
            <Text style={{ color: Colors[theme].subtextSoft }}>
                {analito} {exam.valoresReferencia[analitoIndices[0]]}
            </Text>
            <LineChart
                data={chartData}
                width={screenWidth * 0.95}
                height={220}
                chartConfig={{
                    backgroundColor: Colors[theme].circleBackground,
                    backgroundGradientFrom: Colors[theme].circleBackground,
                    backgroundGradientTo: Colors[theme].circleBackground,
                    decimalPlaces: 2, // defaults to 2dp
                    color: (opacity = 1) => Colors[theme].tint,
                    labelColor: (opacity = 1) => Colors[theme].subtextSoft,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: Colors[theme].tint,
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    alignSelf: "center",
                }}
            />
        </View>
    );
};
