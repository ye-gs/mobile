import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Markdown, { MarkdownProps } from "react-native-markdown-display";
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
            {/* Renderiza o texto da mensagem com Markdown */}
            <Markdown style={markdownStyles(theme)as MarkdownProps['style']}>{item.text}</Markdown>

            {/* Exibe o timestamp da mensagem */}
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
            backgroundColor: Colors[theme].primaryLighter,
        },
        botMessage: {
            alignSelf: "flex-start",
            backgroundColor: Colors[theme].tint,
        },
        timestamp: {
            fontSize: RFValue(10),
            color: Colors[theme].text,
            marginTop: RFValue(5),
            textAlign: "right",
        },
    });

// Estilos para o Markdown (não usa StyleSheet.create)
const markdownStyles = (theme: string) => ({
    text: {
        fontSize: RFValue(14),
        color: Colors[theme].text,
    },
    strong: {
        fontWeight: "bold",
    },
    em: {
        fontStyle: "italic",
    },
    paragraph: {
        marginTop: RFValue(5,808),
        marginBottom: RFValue(5,808),
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: '#FFF',
        borderStyle: 'solid',
      }
});

export default MessageItem;
