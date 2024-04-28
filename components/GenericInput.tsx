import { NumberProp, SvgProps } from "react-native-svg";
import { View } from "./Themed";
import { DimensionValue } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RFValue } from "react-native-responsive-fontsize";

export function GenericInput(props: {
    placeholderText?: string;
    placeholderTextColor?: string;
    borderColor?: string;
    StartImageComponent?: React.ComponentType<SvgProps>;
    EndImageComponent?: React.ComponentType<SvgProps>;
    shouldBeSecure?: boolean;
    onPress?: Function;
    width?: DimensionValue;
    height?: DimensionValue;
    onChange?: Function;
    paddingVertical?: DimensionValue,
    imageSize?: NumberProp,
    endImageSize?: NumberProp
}) {
    const styles = StyleSheet.create({
        container: {
            height: props.height ?? "22%",
            width: props.width ?? "100%",
            borderColor: "rgba(34, 31, 31, 0.1)",
            borderWidth: RFValue(1, 808),
            borderRadius: RFValue(10, 808),
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: RFValue(8, 808),
            paddingRight: RFValue(8, 808),
            paddingVertical: props.paddingVertical ?? 0,
            gap: RFValue(8, 808),
            backgroundColor: "rgba(249, 250, 251, 1)",
        },
        startImageView: {
            width: "7%",
            backgroundColor: "rgba(249, 250, 251, 1)",
        },
        endImageView: {
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(249, 250, 251, 1)",
        },
        input: {
            flex: 3,
            fontSize: RFValue(14, 808),
            left: "3%",
            textAlignVertical: "center",
            color: "#000",
        },
    });
    const placeholderTextColor =
        props.placeholderTextColor ?? "rgba(34, 31, 31, 0.4)";
    const { StartImageComponent, EndImageComponent, onPress } = props;
    return (
        <View style={styles.container}>
            <View style={styles.startImageView}>
                {StartImageComponent ? <StartImageComponent width={props.imageSize} height={props.imageSize} /> : null}
            </View>
            <TextInput
                onChangeText={(text) =>
                    props.onChange ? props.onChange(text) : ""
                }
                style={styles.input}
                placeholder={props.placeholderText ? props.placeholderText : ""}
                placeholderTextColor={placeholderTextColor}
                secureTextEntry={props.shouldBeSecure}
                allowFontScaling={true}
                keyboardType="default"
                autoCapitalize="none"
            ></TextInput>
            <View style={styles.endImageView}>
                {EndImageComponent ? (
                    <EndImageComponent
                        width={props.endImageSize} height={props.endImageSize}
                        onPress={() => (onPress ? onPress() : "")}
                    />
                ) : (
                    ""
                )}
            </View>
        </View>
    );
}
