import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "@/constants/Colors";

const MessageItem = ({
    item,
    theme,
}: {
    item: {
        id: string;
        text: string;
        sender: string;
        createdAt: Date;
        isTyping: boolean;
    };
    theme: string;
}) => {
    const formattedDate = new Date(item.createdAt).toLocaleString();

    return (
        <View
            style={[
                styles(theme).messageContainer,
                item.sender === "user"
                    ? styles(theme).userMessage
                    : styles(theme).botMessage,
            ]}
        >
            <Text style={styles(theme).messageText}>{item.text}</Text>
            <Text style={styles(theme).timestamp}>{formattedDate}</Text>
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
        userMessage: {
            alignSelf: "flex-end",
            backgroundColor: "#DCF8C6", // i love whatsapp,
        },
        botMessage: {
            alignSelf: "flex-start",
            backgroundColor: Colors[theme].tint,
        },
        messageText: {
            fontSize: RFValue(14),
            color: Colors[theme].text,
        },
        timestamp: {
            fontSize: RFValue(10),
            color: Colors[theme].text,
            marginTop: RFValue(5),
            textAlign: "right",
        },
    });

export default MessageItem;
