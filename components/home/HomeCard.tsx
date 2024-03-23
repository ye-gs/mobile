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
}) {
    const { ImageComponent } = props;
    const { theme } = useTheme();
    const colorScheme = theme;
    const styles = StyleSheet.create({
        card: {
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
            width: 100,
        },
        image: {
            width: 50,
            height: 50,
        },
        title: {
            fontSize: 10,
            fontWeight: "600",
            color: Colors[colorScheme ?? "light"].altTextColor,
        },
        value: {
            fontSize: 16,
            fontWeight: "600",
            color: Colors[colorScheme ?? "light"].altTextColor,
        },
        status: {
            fontSize: 5,
            fontWeight: "600",
            color: Colors[colorScheme ?? "light"].altTextColor,
        },
    });
    return (
        <View style={styles.card}>
            <ImageComponent
                width={styles.image.width}
                height={styles.image.height}
            />
            <Text style={styles.title}>{props.text}</Text>
            <Text style={styles.value}>{props.value}</Text>
            <Text style={styles.status}>{props.status}</Text>
        </View>
    );
}
