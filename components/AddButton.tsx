import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "@/constants/Colors";

interface AddButtonProps {
    theme: string;
    onPress: () => void;
}

export const AddButton: React.FC<AddButtonProps> = ({ theme, onPress }) => (
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
        <FontAwesome
            name="plus"
            size={RFValue(24, 808)}
            color={Colors[theme].text}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    addButton: {
        width: RFValue(60, 808),
        height: RFValue(60, 808),
        borderRadius: RFValue(30, 808),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
});
