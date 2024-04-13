import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { User } from "firebase/auth";
import React from "react";
import { StyleSheet, Image, Text, View, DimensionValue } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export function ProfileCard(props: { user: User | null; imageSize?: number; paddingTop?: number}) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        userName: {
            fontSize: RFValue(18, 808),
            color: Colors[theme].text,
            fontWeight: "400",
        },
        userInfo: {
            justifyContent: "flex-start",
            alignItems: "center",
            gap: RFValue(10, 808),
            paddingTop: RFValue(props.paddingTop ?? 30, 808),
            height: "auto",
        },
        userImage: {
            marginTop: RFValue(10, 808),
            width: props.imageSize
                ? RFValue(props.imageSize, 808)
                : RFValue(90, 808),
            height: props.imageSize
                ? RFValue(props.imageSize, 808)
                : RFValue(90, 808),
            borderRadius: RFValue(100, 808),
            borderWidth: RFValue(1, 808),
            borderColor: "#ccc",
        },
    });
    return (
        <View style={styles.userInfo}>
            <Image
                style={styles.userImage}
                source={{
                    uri:
                        props.user?.photoURL ||
                        "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1165301142.jpg",
                }}
            />
            <Text style={styles.userName}>
                {props.user?.displayName || "Gill Bates"}
            </Text>
        </View>
    );
}
