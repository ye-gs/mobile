import { View, Text } from "@/components/Themed";
import { useTheme } from "@/contexts/theme";
import { StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import Colors from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

export function HomeCard(props: {
    text: string;
    value: string;
    ImageComponent: React.ComponentType<SvgProps>;
    status: string;
    fill?: string;
    stroke?: string;
}) {
    const { ImageComponent } = props;
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        card: {
            minWidth: "auto",
            width: "20%",
            height: "auto",
            justifyContent: "center",
            alignItems: "center",
        },
        image: {
            width: RFValue(50, 808),
            height: RFValue(50, 808),
        },
        title: {
            fontSize: RFValue(10, 808),
            fontWeight: "600",
            color: Colors[theme].altTextColor,
        },
        value: {
            fontSize: RFValue(16, 808),
            fontWeight: "600",
            color: Colors[theme].altTextColor,
        },
        status: {
            fontSize: RFValue(8, 808),
            fontWeight: "600",
            color: Colors[theme].altTextColor,
        },
    });

    const fill = props.fill || "none";
    const stroke = props.stroke || "none";
    return (
        <View style={styles.card}>
            <ImageComponent
                width={styles.image.width}
                height={styles.image.height}
                stroke={stroke}
                fill={fill}
            />
            <Text style={styles.title}>{props.text}</Text>
            <Text style={styles.value}>{props.value}</Text>
            <Text style={styles.status}>{props.status}</Text>
        </View>
    );
}
