import { View, Text } from "@/components/Themed";
import { useTheme } from "@/contexts/theme";
import { StyleSheet } from "react-native";
import { SvgProps } from "react-native-svg";
import Colors from "@/constants/Colors";

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
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            width: 100,
            height: 50,

        },
        image: {
            width: 50,
            height: 50,
        },
        title: {
          
            fontSize: 10,
            fontWeight: "600",
            color: Colors[theme].altTextColor,
        },
        value: {
            fontSize: 16,
            fontWeight: "600",
            color: Colors[theme].altTextColor,
        },
        status: {
            fontSize: 5,
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
