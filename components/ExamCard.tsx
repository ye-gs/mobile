import React, { useRef } from "react";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import {
    GestureResponderEvent,
    Pressable,
    StyleSheet,
    Animated,
} from "react-native";
import { View, Text } from "./Themed";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

export function ExamCard(props: { id: string; onPress: Function }) {
    const { theme } = useTheme();
    const examCreationDate = new Date(props.id);

    // Animation value for scale
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Handle press in event
    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95, // Scale down a bit
            useNativeDriver: true,
        }).start();
    };

    // Handle press out event
    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1, // Scale back to normal
            useNativeDriver: true,
        }).start();
    };

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
            borderRadius: RFValue(200, 808),
        },
        timeViewText: {
            fontSize: RFValue(10, 808),
            fontWeight: "bold",
            color: Colors[theme].black,
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
        shadow: {
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.25, // Shadow opacity
            shadowRadius: 3.84, // Shadow radius
            elevation: 5, // Elevation for Android shadow
        },
    });

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={props.onPress as (event: GestureResponderEvent) => void}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <View style={[styles.timeView, styles.shadow]}>
                    <Text style={styles.timeViewText}>
                        {examCreationDate.toLocaleTimeString()}
                    </Text>
                </View>
                <View style={styles.endContentView}>
                    <Text style={styles.date}>
                        {examCreationDate.toLocaleDateString()}
                    </Text>
                    <AntDesign
                        name="right"
                        size={RFValue(20, 808)}
                        color={Colors[theme].subtextSoft}
                    />
                </View>
            </Animated.View>
        </Pressable>
    );
}
