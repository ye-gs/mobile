import { SvgProps } from "react-native-svg";
import { GenericIconButton } from "../GenericIconButton";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";
import { DimensionValue } from "react-native";

export const OptionButton = (props: {
    text: string;
    ImageComponent?: React.ComponentType<SvgProps>;
    onPress?: Function;
    borderWidth?: number;
    borderBottomWidth?: number;
    borderTopWidth?: number;
    buttonHeight?: DimensionValue;
    fontWeight?: WeightValue;
    fontSize?: number;
}) => {
    const { theme } = useTheme();
    return (
        <GenericIconButton
            text={props.text}
            ImageComponent={props.ImageComponent}
            borderWidth={0}
            onPress={props.onPress}
            borderBottomWidth={props.borderBottomWidth}
            borderTopWidth={props.borderTopWidth}
            EndImageComponent={() => (
                <AntDesign
                    name="right"
                    size={RFValue(22, 808)}
                    color={Colors[theme].text}
                />
            )}
            width={"90%"}
            height={props.buttonHeight ?? "25%"}
            fontSize={props.fontSize}
            imageSize={"70%"}
            endImageSize={"20%"}
            fontWeight={props.fontWeight}
        ></GenericIconButton>
    );
};
