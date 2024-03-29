import { View } from "@/components/Themed";
import { HomeOption } from "@/components/home/HomeOption";
import { StyleSheet } from "react-native";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";

export function HomeRoutingOptions() {
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        options: {
            flexDirection: "row",
            gap: RFValue(60, 808),
        },
        circle: {
            backgroundColor: Colors[theme].circleBackground,
            padding: RFValue(20, 808),
            borderRadius: 100,
            overflow: "hidden",
        },
    });
    return (
        <View style={styles.options}>
            <HomeOption
                text="Exames"
                ImageComponent={() => (
                    <MaterialCommunityIcons
                        onPress={() => router.replace("/exams")}
                        name="stethoscope"
                        size={RFValue(40, 808)}
                        color={Colors[theme].tint}
                        style={styles.circle}
                    ></MaterialCommunityIcons>
                )}
            />
            <HomeOption
                text="Medicação"
                ImageComponent={() => (
                    <MaterialCommunityIcons
                        onPress={() => router.replace("/meds")}
                        name="pill"
                        size={RFValue(40, 808)}
                        color={Colors[theme].tint}
                        style={styles.circle}
                    ></MaterialCommunityIcons>
                )}
            ></HomeOption>
        </View>
    );
}

const styles = StyleSheet.create({});
