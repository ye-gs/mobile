import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import Colors from "@/constants/Colors";

const MessageInput = ({ inputMessage, setInputMessage, handleSendMessage, theme }: { inputMessage: string; setInputMessage: (text: string) => void; handleSendMessage: () => void; theme: string }) => (
    <View style={styles(theme).inputContainer}>
        <TextInput
            style={[styles(theme).input, { backgroundColor: Colors[theme].background }]}
            placeholder="Digite uma mensagem..."
            placeholderTextColor={Colors[theme].text}
            value={inputMessage}
            onChangeText={setInputMessage}
        />
        <TouchableOpacity style={styles(theme).sendButton} onPress={handleSendMessage}>
            <FontAwesome name="send" size={RFValue(24)} color={Colors[theme].tint} />
        </TouchableOpacity>
    </View>
);

const styles = (theme: string) =>
    StyleSheet.create({
        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            padding: RFValue(20),
            borderTopWidth: 1,
            borderColor: Colors[theme].borderColor,
            backgroundColor: Colors[theme].background,
        },
        input: {
            flex: 1,
            height: RFValue(40),
            borderRadius: RFValue(20),
            paddingHorizontal: RFValue(15),
            borderColor: Colors[theme].borderColor,
            borderWidth: 1,
        },
        sendButton: {
            marginLeft: RFValue(10),
            padding: RFValue(5),
            borderRadius: RFValue(25),
            backgroundColor: Colors[theme].circleBackground,
        },
    });

export default MessageInput;