import { SvgProps } from "react-native-svg";
import { GenericIconButton } from "../GenericIconButton";
import { AntDesign } from "@expo/vector-icons";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
export function OptionButton(props: {
  text: string;
  ImageComponent: React.ComponentType<SvgProps>;
  onPress?: Function;
  borderWidth?: number;
  borderBottomWidth?: number;
  borderTopWidth?: number;
}) {
  const { theme } = useTheme();
  return (
    <GenericIconButton
      text={props.text}
      ImageComponent={props.ImageComponent}
      borderWidth={0}
      borderBottomWidth={props.borderBottomWidth}
      borderTopWidth={props.borderTopWidth}
      EndImageComponent={() => (
        <AntDesign
          name="right"
          size={22}
          color={Colors[theme].text}
        />
      )}
      width={"90%"}
      height={"25%"}
      fontSize={16}
      imageSize={"70%"}
      endImageSize={"20%"}
    ></GenericIconButton>
  );
}
