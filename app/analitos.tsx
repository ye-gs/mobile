import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { GetItemInfo, AnalitoInfo } from "@/components/searchItem";
import { HomeBiometricInfo } from "@/components/home/HomeBiometricInfo";
import { GeneralStyles } from "@/constants/Styles";

const Analitos = () => {
    const { analitoName } = useLocalSearchParams();
    const analitoNameStr = Array.isArray(analitoName)
        ? analitoName[0]
        : analitoName;

    const [analitoInfo, setAnalitoInfo] = useState<AnalitoInfo[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const data = await GetItemInfo(analitoNameStr);
            setAnalitoInfo(data);
        };

        fetchData();
    }, [analitoNameStr]);

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
                `Usando o item mais recente: ${sortedAnalitoInfo[0].resultado}`,
                router.push("/home")

            );
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
                GeneralStyles().card1,
                selectedIndex === index && GeneralStyles().selectedCard1,
            ]}
            onPress={() => {
                setSelectedIndex(index);
                console.log(item.resultado); // Exibir o resultado no console
                router.push("/home")

            }}
        >
            <View style={GeneralStyles().checkboxAndTextContainer1}>
                <TouchableOpacity
                    style={GeneralStyles().checkboxContainer1}
                    onPress={() =>
                        setSelectedIndex(selectedIndex === index ? null : index)
                    }
                />
                <View style={GeneralStyles().textContainer1}>
                    <Text style={GeneralStyles().cardText1}>
                        {item.resultado} {item.unidade}
                    </Text>
                    <Text style={GeneralStyles().cardDate1}>
                        {item.seconds?.toLocaleString()}
                    </Text>
                </View>
                <View style={GeneralStyles().checkbox1}>
                    {selectedIndex === index ? (
                        <View style={GeneralStyles().checkboxFilled1} />
                    ) : null}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={GeneralStyles().container7}>
            <View style={GeneralStyles().headerContainer1}>
                <Text style={GeneralStyles().title2}>Analito Selecionado</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/home")}>
                <Text style={GeneralStyles().link2}>Voltar para Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleUseLatest}>
                <Text style={GeneralStyles().link2}>Usar mais recente</Text>
            </TouchableOpacity>
            <Text style={GeneralStyles().analitoName1}>{analitoNameStr}</Text>

            <FlatList
                data={analitoInfo
                    .filter(
                        (item) =>
                            item.resultado !== null &&
                            item.resultado !== undefined
                    )
                    .sort((a, b) => {
                        if (a.seconds && b.seconds) {
                            return Number(b.seconds) - Number(a.seconds);
                        }
                        if (a.seconds) return -1;
                        if (b.seconds) return 1;
                        return 0;
                    })}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderAnalitoItem}
                contentContainerStyle={GeneralStyles().listContainer1}
            />
        </View>
    );
};

// const colors = {
//     primary: "#333",
//     secondary: "#fff",
//     background: "#f5f5f5",
//     cardBackground: "#fff",
//     cardBorder: "#ddd",
//     buttonBackground: "#007BFF",
//     buttonText: "#FFF",
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: colors.background,
//         padding: 20,
//     },
//     headerContainer: {
//         marginTop: 20,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 20,
//     },
//     title: {
//         fontSize: 26,
//         fontWeight: "bold",
//         color: colors.primary,
//     },
//     link: {
//         fontSize: 16,
//         color: colors.buttonBackground,
//     },
//     analitoName: {
//         fontSize: 22,
//         color: colors.primary,
//         marginBottom: 20,
//         textAlign: "center",
//     },
//     listContainer: {
//         paddingBottom: 40,
//         width: "98%",
//         alignSelf: "center",
//     },
//     card: {
//         backgroundColor: colors.cardBackground,
//         borderRadius: 10,
//         padding: 20,
//         marginVertical: 10,
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 6,
//         elevation: 4, // Shadow for Android
//         width: "95%",
//         alignSelf: "center",
//     },
//     selectedCard: {
//         borderColor: colors.buttonBackground,
//         borderWidth: 2,
//     },
//     checkboxAndTextContainer: {
//         flexDirection: "row",
//         alignItems: "center",
//     },
//     checkboxContainer: {
//         marginRight: 15,
//     },
//     checkbox: {
//         width: 22,
//         height: 22,
//         borderRadius: 5,
//         borderWidth: 2,
//         borderColor: colors.primary,
//         justifyContent: "center",
//         alignItems: "center",
//     },
//     checkboxFilled: {
//         width: 12,
//         height: 12,
//         backgroundColor: colors.primary,
//     },
//     textContainer: {
//         flex: 1,
//     },
//     cardText: {
//         fontSize: 18,
//         fontWeight: "bold",
//         color: colors.primary,
//     },
//     cardDate: {
//         marginTop: 10,
//         fontSize: 16,
//         color: colors.primary,
//     },
// });

export default Analitos;
