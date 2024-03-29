import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { User } from "firebase/auth";
import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export function ProfileCard(props: { user: User | null }) {
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
            gap: 10,
            paddingTop: 30,
            height: "auto",
        },
        userImage: {
            marginTop: 10,
            width: RFValue(90, 808),
            height: RFValue(90, 808),
            borderRadius: 100,
            borderWidth: 1,
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
