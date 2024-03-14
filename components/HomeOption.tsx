import { StyleSheet } from "react-native"
import { Text, View } from "@/components/Themed"
import { SvgProps } from "react-native-svg"

export function HomeOption(props: { text: string, ImageComponent: React.ComponentType<SvgProps> }) {

    const { ImageComponent } = props;
    return (
        <View style={styles.container}>
            <ImageComponent width={styles.optionImage.width} height={styles.optionImage.height} viewBox="56 40 50 50" />
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
        width: 70,
        height: 70,
    },
    title: {
        fontSize: 14
    }
})