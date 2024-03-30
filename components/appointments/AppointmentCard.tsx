import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { Pressable, StyleSheet, Text } from "react-native";
import { View } from "../Themed";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export function AppointmentCard() {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            height: "12%",
            width: "90%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderColor: Colors[theme].borderColor,
        },
        timeView: {
            backgroundColor: Colors[theme].primaryLighter,
            height: "80%",
            aspectRatio: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
        },
        timeViewText: {
            fontSize: 20,
            fontWeight: "bold",
        },
        contentView: {
            flex:1,
            height: '100%',
            justifyContent: "space-evenly",
            paddingHorizontal: '2%',
        },
        contentViewText: {
            fontSize: 16,
            fontWeight: "bold",
            color: Colors[theme].text
        },
        contentViewSubtext: {
            fontSize: 13,
            fontWeight: "bold",
            color: Colors[theme].subtext
        },
        date: {
            fontSize: 12,
            textAlignVertical: "center",
            color: Colors[theme].subtextSoft
        },
        endContentView: {
            flexDirection: "row",
            width: "auto",
        },
    });
    return (
        <Pressable style={styles.container}>
            <View style={styles.timeView}>
                <Text style={styles.timeViewText}>07:00</Text>
            </View>
            <View style={styles.contentView}>
                <Text style={styles.contentViewText}>Dr Flamingo</Text>
                <Text numberOfLines={1} style={styles.contentViewSubtext}>
                    Exame de prostata
                </Text>
            </View>
            <View style={styles.endContentView}>
                <Text style={styles.date}>Mon, 14 Dec</Text>
                <AntDesign
                    name="right"
                    size={RFValue(20, 808)}
                    color={Colors[theme].subtextSoft}
                />
            </View>
        </Pressable>
    );
}
