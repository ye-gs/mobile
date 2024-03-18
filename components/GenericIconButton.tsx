import { SvgProps } from "react-native-svg";
import { StyleSheet, Pressable, DimensionValue, GestureResponderEvent } from "react-native";
import { Text, View } from "./Themed";

export function GenericIconButton(props:{text:string, ImageComponent: React.ComponentType<SvgProps>, width?: DimensionValue, height?: DimensionValue, fontSize?: number, onPress?: Function}){
    const styles = StyleSheet.create({
        container:{
            flexDirection: 'row',
            borderWidth: 1,
            width: props.width ?? "100%",
            height: props.height ?? 50,
            alignItems: 'center',
            borderRadius: 6,
            borderColor: '#E5E7EB'
        },
        text:{
            fontWeight: '500',
            fontSize: props.fontSize ?? 16
        },
        imageView:{
            width: '18%',
            alignItems: 'center'
        }
    })
    const  { ImageComponent } = props;
    return(
        <Pressable style={styles.container} onPress={props.onPress as (event: GestureResponderEvent) => void}>
            <View style={styles.imageView}>
                <ImageComponent></ImageComponent>
            </View>
            <Text style={styles.text}>
                {props.text}
            </Text>
        </Pressable>
    )
}

