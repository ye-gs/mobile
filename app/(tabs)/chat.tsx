import React, { useState, useEffect } from "react";
import { View, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { collection, addDoc, orderBy, query, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db, auth } from "@/firebase/index"; // Importa Firestore e Auth
import { RFValue } from "react-native-responsive-fontsize";
import MessageItem from "@/components/messages/MessageItem";
import MessageInput from "@/components/messages/MessageInput";

export default function ChatScreen() {
    const { theme } = useTheme();

    const [messages, setMessages] = useState<{ id: string; text: string; sender: string; createdAt: Date }[]>([]);
    const [inputMessage, setInputMessage] = useState("");

    // Get the current user ID
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (!userId) return;

        // Reference to the user's messages collection
        const messagesCollectionRef = collection(db, `users/${userId}/messages`);
        const messagesQuery = query(messagesCollectionRef, orderBy("createdAt", "asc"));

        // Listener para ouvir as mudanças em tempo real no Firestore
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const loadedMessages = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text,
                    sender: data.sender,
                    createdAt: data.createdAt ? data.createdAt.toDate() : new Date(), // Verifica se createdAt existe e é um timestamp
                };
            });

            setMessages(loadedMessages);
        });

        // Cleanup do listener ao desmontar o componente
        return () => unsubscribe();
    }, [userId]);

    // Função para enviar uma mensagem e armazená-la no Firestore
    const handleSendMessage = async () => {
        if (!userId) return;

        if (inputMessage.trim()) {
            const newMessage = {
                text: inputMessage,
                sender: "user",
                createdAt: serverTimestamp(),
            };

            await addDoc(collection(db, `users/${userId}/messages`), newMessage);

            setInputMessage("");
        }
    };

    return (
        <KeyboardAvoidingView style={styles(theme).container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <MessageItem item={item} theme={theme} />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles(theme).messageList}
            />
            <MessageInput inputMessage={inputMessage} setInputMessage={setInputMessage} handleSendMessage={handleSendMessage} theme={theme} />
        </KeyboardAvoidingView>
    );
}

const styles = (theme: string) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors[theme].background,
        },
        messageList: {
            flexGrow: 1,
            justifyContent: "flex-end",
            padding: RFValue(10),
        },
    });