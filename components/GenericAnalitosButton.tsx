import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";

// Define the specific type for icon names
type FontAwesomeIconNames = keyof typeof FontAwesome.glyphMap;

interface GenericAnalitosButtonProps {
    theme: string | number;
    analito: string | null;
    measure: string | number | null;
    unidade: string | number | null;
    onPress: () => void;
    iconName?: FontAwesomeIconNames;
}

export const GenericAnalitosButton: React.FC<GenericAnalitosButtonProps> = ({
    theme,
    analito,
    measure,
    unidade,
    onPress,
    iconName = "plus", // Default to "plus" if no icon is provided
}) => (
    <View style={styles.container}>
        <TouchableOpacity style={[styles.addButton]} onPress={onPress}>
            <View style={styles.iconContainer}>
                <FontAwesome
                    name={analito && measure ? iconName : "plus"} // Use iconName or fallback to "plus"
                    size={RFValue(30, 808)}
                    color={"red"}
                />
            </View>

            {/* Conditionally render the texts */}
            {analito && measure ? (
                <View style={styles.textContainer}>
                    <Text
                        style={styles.analitoText}
                        numberOfLines={4}
                        ellipsizeMode="head"
                    >
                        {analito}
                    </Text>
                    <Text
                        style={styles.measureText}
                        numberOfLines={4}
                        ellipsizeMode="tail"
                    >
                        {measure + " "}
                        {unidade}
                    </Text>
                </View>
            ) : (
                <View style={styles.textContainer}>
                    <Text
                        style={styles.addAnalitoText}
                        numberOfLines={3}
                        ellipsizeMode="middle"
                    >
                        Aperte para adicionar exame
                    </Text>
                </View>
            )}
        </TouchableOpacity>
        <View style={styles.analitosInfo} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    addButton: {
        width: RFValue(120, 808),
        height: RFValue(160, 808),
        borderRadius: RFValue(30, 808),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: RFValue(3, 808), // Espessura da borda
        borderColor: "#388E3C", // Cor da borda do botão (verde)
        paddingVertical: RFValue(10, 808),

    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFC107", // Cor do ícone (amarelo)
        borderRadius: RFValue(20, 808), // Adiciona arredondamento ao ícone
        padding: RFValue(10, 808),
    },
    textContainer: {
        alignItems: "center",
        marginTop: RFValue(6, 808),
        width: "85%",
    },
    measureText: {
        fontSize: RFValue(17, 808),
        fontWeight: "bold",
        textAlign: "center",
        maxWidth: "100%",
        overflow: "hidden",
        color: "#333333", // Cor do texto dentro do botão
    },
    analitoText: {
        fontSize: RFValue(16, 808),
        textAlign: "center",
        maxWidth: "100%",
        overflow: "hidden",
        color: "#333333", // Cor do texto analito
    },
    addAnalitoText: {
        fontSize: RFValue(13, 808),
        textAlign: "center",
        fontWeight: "bold",
        color: "#333333", // Cor do texto para a mensagem 'add analito'
    },
    analitosInfo: {
        height: RFValue(10, 808),
        alignSelf: "center",
    },
});
