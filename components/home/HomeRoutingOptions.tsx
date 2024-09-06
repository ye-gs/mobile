import { View, Animated, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { HomeOption } from "@/components/home/HomeOption";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { router } from "expo-router";
import { useRef } from "react";

export function HomeRoutingOptions() {
    const { theme } = useTheme();

    // Create separate animations for each icon
    const scaleAnimExams = useRef(new Animated.Value(1)).current;
    const scaleAnimMeds = useRef(new Animated.Value(1)).current;

    const handlePressIn = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = (anim: Animated.Value) => {
        Animated.spring(anim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

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
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000", // Shadow color
  shadowOffset: { width: 0, height: 2 }, // Shadow offset
  shadowOpacity: 1, // Shadow opacity
  shadowRadius: 3.84, // Shadow radius
  elevation: 10, // Elevation for Android shadow
},
        animatedIcon: {
            transform: [{ scale: scaleAnimExams }], // Apply animation based on the icon
        },
        animatedIconMeds: {
            transform: [{ scale: scaleAnimMeds }], // Apply animation based on the icon
        },
        text: {
            fontSize: RFValue(16, 808),
            color: Colors[theme].text,
        },
    });

    return (
        <View style={styles.options}>
            <HomeOption
                text="Exames"
                ImageComponent={() => (
                    <TouchableWithoutFeedback
                        onPressIn={() => handlePressIn(scaleAnimExams)}
                        onPressOut={() => handlePressOut(scaleAnimExams)}
                        onPress={() => router.replace("/exams")}
                    >
                        <Animated.View style={[styles.circle, styles.animatedIcon]}>
                            <MaterialCommunityIcons
                                name="stethoscope"
                                size={RFValue(40, 808)}
                                color={Colors[theme].tint}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )}
            />
            <HomeOption
                text="Medicação"
                ImageComponent={() => (
                    <TouchableWithoutFeedback
                        onPressIn={() => handlePressIn(scaleAnimMeds)}
                        onPressOut={() => handlePressOut(scaleAnimMeds)}
                        onPress={() => router.replace("/meds")}
                    >
                        <Animated.View style={[styles.circle, styles.animatedIconMeds]}>
                            <MaterialCommunityIcons
                                name="pill"
                                size={RFValue(40, 808)}
                                color={Colors[theme].tint}
                            />
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )}
            />
        </View>
    );
}
