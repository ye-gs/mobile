import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/Colors";
import { RFValue } from "react-native-responsive-fontsize";

const TypingMessageItem = ({ theme }: { theme: string }) => {
    const dot1Animation = useRef(new Animated.Value(0)).current;
    const dot2Animation = useRef(new Animated.Value(0)).current;
    const dot3Animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Sequencialmente animar os pontos
        Animated.loop(
            Animated.stagger(300, [
                Animated.sequence([
                    Animated.timing(dot1Animation, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot1Animation, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(dot2Animation, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot2Animation, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(dot3Animation, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(dot3Animation, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    }, []);

    return (
        <View
            style={[styles(theme).messageContainer, styles(theme).botMessage]}
        >
            <View style={styles(theme).dotContainer}>
                <Animated.Text
                    style={[styles(theme).dot, { opacity: dot1Animation }]}
                >
                    •
                </Animated.Text>
                <Animated.Text
                    style={[styles(theme).dot, { opacity: dot2Animation }]}
                >
                    •
                </Animated.Text>
                <Animated.Text
                    style={[styles(theme).dot, { opacity: dot3Animation }]}
                >
                    •
                </Animated.Text>
            </View>
        </View>
    );
};

const styles = (theme: string) =>
    StyleSheet.create({
        messageContainer: {
            borderRadius: RFValue(15),
            padding: RFValue(10),
            marginVertical: RFValue(5),
            maxWidth: "75%",
        },
        botMessage: {
            alignSelf: "flex-start",
            backgroundColor: Colors[theme].tint,
        },
        dotContainer: {
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
        },
        dot: {
            fontSize: RFValue(18),
            color: Colors[theme].text,
            marginHorizontal: RFValue(2),
        },
    });

export default TypingMessageItem;
