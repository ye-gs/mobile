import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "@/constants/Colors";
import { Text, View } from "@/components/Themed";
import { useTheme } from "@/contexts/theme";

// Define the specific type for icon names
type FontAwesomeIconNames = keyof typeof FontAwesome.glyphMap;

interface GenericAnalitosButtonProps {
    analito: string | undefined;
    measure: string | number | undefined;
    unidade: string | number | undefined;
    onPress: () => void;
    iconName?: FontAwesomeIconNames;
}

export const GenericAnalitosButton: React.FC<GenericAnalitosButtonProps> = ({
    analito,
    measure,
    unidade,
    onPress,
    iconName = "plus", // Default to "plus" if no icon is provided
}) => {
    const { theme } = useTheme(); // Mova o hook para dentro do componente funcional

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.addButton, { borderColor: Colors[theme].tint }]} onPress={onPress}>
                <View style={[styles.iconContainer, { backgroundColor: Colors[theme].circleBackground }]}>
                    <FontAwesome
                        name={analito && measure ? iconName : "plus"} // Use iconName or fallback to "plus"
                        size={RFValue(30, 808)}
                        color={Colors[theme].altTextColor} // Cor do ícone
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
};

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
        paddingVertical: RFValue(10, 808),
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
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
