import { StyleSheet, Pressable, DimensionValue } from "react-native";
import { Text } from "./Themed";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

export function GenericButton(props: {
    title: string;
    color?: string;
    onPress: Function;
    fontColor?: string;
    height?: DimensionValue;
    width?: DimensionValue;
}) {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            borderColor: "rgba(229, 231, 235, 1)",
            borderWidth: RFValue(1),
            borderRadius: 100,
            backgroundColor: props.color ?? Colors[theme].altTextColor,
            justifyContent: "center",
            alignItems: "center",
            height: props.height ?? "auto",
            width: props.width ?? "auto",
        },
        text: {
            color: props.fontColor ?? "#fff",
            fontWeight: "600",
            fontSize: RFValue(18, 808),
        },
    });

    return (
        <Pressable style={styles.container} onPress={() => props.onPress()}>
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    );
}
