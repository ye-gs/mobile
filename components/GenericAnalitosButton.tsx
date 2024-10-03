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
        <TouchableOpacity
            style={[
                styles.addButton,
                {
                    backgroundColor: Colors[theme].primary,
                    borderColor: Colors[theme].border,
                },
            ]}
            onPress={onPress}
        >
            <View style={styles.iconContainer}>
                <FontAwesome
                    name={analito && measure ? iconName : "plus"} // Use iconName or fallback to "plus"
                    size={RFValue(30, 808)}
                    color={Colors[theme].text}
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
                        {measure+ " "}{unidade}
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
        width: RFValue(120, 808), // Maintain size to accommodate content
        height: RFValue(140, 808),
        borderRadius: RFValue(60, 808), // Maintain proportional border radius
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        paddingVertical: RFValue(10, 808),
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: RFValue(10, 808), // Space between icon and text
    },
    textContainer: {
        alignItems: "center",
        marginTop: RFValue(6, 808),
        width: "85%", // Ensure the text fits within the button width
    },
    measureText: {
        fontSize: RFValue(17, 808), // Larger font size for the text
        fontWeight: "bold",
        textAlign: "center",
        maxWidth: "100%", // Limit width to avoid overflow
        overflow: "hidden", // Ensure no overflow happens
    },
    analitoText: {
        fontSize: RFValue(16, 808), // Slightly smaller than analito text
        textAlign: "center",
        maxWidth: "100%", // Limit width to avoid overflow
        overflow: "hidden", // Ensure no overflow happens
    },
    addAnalitoText: {
        fontSize: RFValue(13, 808), // Font size for the 'add analito' message
        textAlign: "center",
        fontWeight: "bold",
    },
    analitosInfo: {
        height: RFValue(10, 808),
        alignSelf: "center",
    },
});
