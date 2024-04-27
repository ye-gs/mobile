import { StyleSheet, Pressable, DimensionValue } from "react-native";
import { Text } from "./Themed";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { SvgProps } from "react-native-svg";

export function GenericButton(props: {
    ImageComponent?: React.ComponentType<SvgProps>;
    title: string;
    color?: string;
    onPress: Function;
    fontColor?: string;
    height?: DimensionValue;
    width?: DimensionValue;
}) {
    const { theme } = useTheme();
    const { ImageComponent } = props;
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
            flexDirection: "row",
            gap: 8

        },
        text: {
            color: props.fontColor ?? "#fff",
            fontWeight: "600",
            fontSize: RFValue(18, 808),
        },
    });

    return (
        <Pressable style={styles.container} onPress={() => props.onPress()}>
            {ImageComponent ? (
                    <ImageComponent
                        width={"60%"}
                        height={"60%"}
                    ></ImageComponent>
                ) : null}
            <Text style={styles.text}>{props.title}</Text>
        </Pressable>
    );
}
