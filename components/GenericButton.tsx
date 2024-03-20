import { StyleSheet, Pressable, DimensionValue } from "react-native";
import { Text } from "./Themed";


export function GenericButton(props: { title: string, color?: string, onPress: Function, fontColor?: string, height?: DimensionValue, width?: DimensionValue }) {
    const styles = StyleSheet.create({
        container: {
            borderColor: 'rgba(229, 231, 235, 1)',
            borderWidth: 1,
            borderRadius: 100,
            backgroundColor: props.color ?? '#407CE2',
            justifyContent: 'center',
            alignItems: 'center',
            height: props.height ?? 'auto',
            width: props.width ?? '80%'
        },
        text: {
            color: props.fontColor ?? "#fff",
            fontWeight: '600',
            fontSize: 18,
        }
    })

    return (
        <Pressable style={styles.container} onPress={() => props.onPress()}>
            <Text style={styles.text}>
                {props.title}
            </Text>
        </Pressable>
    )

}