import { View, Text } from "@/components/Themed"
import { StyleSheet } from "react-native"
import { SvgProps } from "react-native-svg";

export function HomeCard(props: { text: string, value: string, ImageComponent: React.ComponentType<SvgProps>, status: string }) {
    const  { ImageComponent } = props;
    return (
        <View style={styles.card}>
            <ImageComponent width={styles.image.width} height={styles.image.height}/>
            <Text style={styles.title}>{props.text}</Text>
            <Text style={styles.value}>{props.value}</Text>
            <Text style={styles.status}>{props.status}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'center',
        alignItems: 'center',
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
        color: "rgba(64, 124, 226, 0.74)"
    },
    value: {
        fontSize: 16,
        fontWeight: "600",
        color: "rgba(64, 123, 255, 1)"
    },
    status: {
        fontSize: 5,
        fontWeight: "600",
        color: "rgba(113, 158, 233, 1)"
    }
})