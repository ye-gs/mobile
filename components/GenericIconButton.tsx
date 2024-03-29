import { NumberProp, SvgProps } from "react-native-svg";
import {
    StyleSheet,
    Pressable,
    DimensionValue,
    GestureResponderEvent,
} from "react-native";
import { Text, View } from "./Themed";
import { RFValue } from "react-native-responsive-fontsize";
export function GenericIconButton(props: {
    text: string;
    ImageComponent: React.ComponentType<SvgProps>;
    EndImageComponent?: React.ComponentType<SvgProps>;
    width?: DimensionValue;
    height?: DimensionValue;
    fontSize?: number;
    fontWeight?: string | undefined;
    onPress?: Function;
    borderWidth?: number;
    borderTopWidth?: number;
    borderBottomWidth?: number;
    imageSize?: NumberProp;
    endImageSize?: NumberProp;
}) {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            borderWidth: RFValue(props.borderWidth ?? 1, 808),
            width: props.width ?? "100%",
            height: props.height ?? 50,
            alignItems: "center",
            borderRadius: 6,
            borderColor: "#E5E7EB",
            borderTopWidth: RFValue(props.borderTopWidth ?? props.borderWidth ?? 1, 808),
            borderBottomWidth:RFValue(props.borderBottomWidth ?? props.borderWidth ?? 1, 808),
        },
        text: {
            flex: 3,    
            fontWeight: "500",
            fontSize: RFValue(props.fontSize ?? 16, 808),
        },
        imageView: {
            width: "18%",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0)",
        },
        endImageView: {
            width: "18%",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0)",
        },
    });
    const { ImageComponent, EndImageComponent } = props;
    return (
        <Pressable
            style={styles.container}
            onPress={props.onPress as (event: GestureResponderEvent) => void}
        >
            <View style={styles.imageView}>
                <ImageComponent
                    width={props.imageSize ?? "60%"}
                    height={props.imageSize ?? "60%"}
                ></ImageComponent>
            </View>
            <Text style={styles.text}>{props.text}</Text>
            <View style={styles.endImageView}>
                {EndImageComponent ? (
                    <EndImageComponent
                        width={props.endImageSize ?? "100%"}
                        height={props.endImageSize ?? "100%"}
                    />
                ) : null}
            </View>
        </Pressable>
    );
}
