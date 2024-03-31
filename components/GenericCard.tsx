import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Text,
} from "react-native";
import { View } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export function GenericCard(props: {
    time: string;
    text: string;
    subtext: string;
    date: string;
    onPress?: Function;
}) {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            height: RFValue(80, 808),
            minHeight: "auto",
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: RFValue(1, 808),
            borderColor: Colors[theme].borderColor,
        },
        timeView: {
            backgroundColor: Colors[theme].primaryLighter,
            height: "80%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: RFValue(100, 808),
        },
        timeViewText: {
            fontSize: RFValue(20, 808),
            fontWeight: "bold",
        },
        contentView: {
            flex: 1,
            height: "100%",
            justifyContent: "space-evenly",
            paddingHorizontal: "2%",
        },
        contentViewText: {
            fontSize: RFValue(16, 808),
            fontWeight: "bold",
            color: Colors[theme].text,
        },
        contentViewSubtext: {
            fontSize: RFValue(13, 808),
            fontWeight: "bold",
            color: Colors[theme].subtext,
        },
        date: {
            fontSize: RFValue(12, 808),
            textAlignVertical: "center",
            color: Colors[theme].subtextSoft,
        },
        endContentView: {
            flexDirection: "row",
            width: "auto",
        },
    });
    return (
        <Pressable
            style={styles.container}
            onPress={props.onPress as (event: GestureResponderEvent) => void}
        >
            <View style={styles.timeView}>
                <Text style={styles.timeViewText}>{props.time}</Text>
            </View>
            <View style={styles.contentView}>
                <Text style={styles.contentViewText}>{props.text}</Text>
                <Text numberOfLines={1} style={styles.contentViewSubtext}>
                    {props.subtext}
                </Text>
            </View>
            <View style={styles.endContentView}>
                <Text style={styles.date}>{props.date}</Text>
                <AntDesign
                    name="right"
                    size={RFValue(20, 808)}
                    color={Colors[theme].subtextSoft}
                />
            </View>
        </Pressable>
    );
}
