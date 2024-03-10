import { StyleSheet } from "react-native"
import { Text, View } from "@/components/Themed"
import { SvgProps } from "react-native-svg"

export function HomeOption(props: { text: string, ImageComponent: React.ComponentType<SvgProps> }) {

    const { ImageComponent } = props;
    return (
        <View style={styles.container}>
            <ImageComponent width={styles.optionImage.width} height={styles.optionImage.height} viewBox="40 40 80 80" />
            <Text style={styles.title}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionImage: {
        width: 80,
        height: 80,
    },
    title: {
        fontSize: 14
    }
})