import React, { useState, useEffect } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
} from "react-native";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
    serverTimestamp,
    getDoc,
    doc,
} from "firebase/firestore";
import { db, auth } from "@/firebase/index"; // Importa Firestore e Auth
import { RFValue } from "react-native-responsive-fontsize";
import MessageItem from "@/components/messages/MessageItem";
import MessageInput from "@/components/messages/MessageInput";
import Constants from "expo-constants";
import {
    getAppointmentsFromCache,
    getExamsFromCache,
    getMedsFromCache,
} from "@/cache";

export default function ChatScreen() {
    const { theme } = useTheme();
    const [messages, setMessages] = useState<
        { id: string; text: string; sender: string; createdAt: Date }[]
    >([]);
    const [inputMessage, setInputMessage] = useState("");

    // Get the current user ID
    const userId = auth.currentUser?.uid;

    useEffect(() => {
        if (!userId) return;

        // Reference to the user's messages collection
        const messagesCollectionRef = collection(
            db,
            `users/${userId}/messages`
        );
        const messagesQuery = query(
            messagesCollectionRef,
            orderBy("createdAt", "asc")
        );

        // Listener para ouvir as mudanças em tempo real no Firestore
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const loadedMessages = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text,
                    sender: data.sender,
                    createdAt: data.createdAt
                        ? data.createdAt.toDate()
                        : new Date(), // Verifica se createdAt existe e é um timestamp
                };
            });

            setMessages(loadedMessages);
        });

        // Cleanup do listener ao desmontar o componente
        return () => unsubscribe();
    }, [userId]);

    // Função para enviar uma mensagem e armazená-la no Firestore
    const handleSendMessage = async () => {
        console.log(userId);
        if (!userId) return;

        if (inputMessage.trim()) {
            const newMessage = {
                text: inputMessage,
                sender: "user",
                createdAt: serverTimestamp(),
            };

            await addDoc(
                collection(db, `users/${userId}/messages`),
                newMessage
            );
            const initialPath = `users/${userId}`;
            const document = await getDoc(doc(db, initialPath));

            if (!document.exists()) {
                alert("Usuário não encontrado.");
            }

            const userData = document.data();
            const weight = userData?.weight;
            console.log("weight: ", weight);
            const height = userData?.height;
            console.log("height: ", height);
            let bmi = null;
            if (weight !== undefined && height !== undefined) {
                bmi = weight / (height * height);
            }
            console.log(bmi);

            const birthday = userData?.birthday.toDate().toISOString();
            console.log(birthday);
            const [exams, appointments, meds] = await Promise.all([
                getExamsFromCache(userId),
                getAppointmentsFromCache(userId),
                getMedsFromCache(userId),
            ]);
            const authHeader =
                "Bearer " + (await auth.currentUser?.getIdToken());
            const body = JSON.stringify({
                weight,
                height,
                message: inputMessage,
                bmi,
                birthday,
                exams,
                appointments,
                meds,
            });
            const res = await fetch(
                Constants.expoConfig?.extra?.chatGptAPIUrl,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: authHeader,
                    },
                    body: body,
                }
            );
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                const botMessage = {
                    text: data.message,
                    sender: "bot",
                    createdAt: serverTimestamp(),
                };
                await addDoc(
                    collection(db, `users/${userId}/messages`),
                    botMessage
                );
            } else {
                const data = await res.json();
                console.log(data);
                const botMessage = {
                    text: "Erro ao enviar mensagem: " + data.Message,
                    sender: "bot",
                    createdAt: serverTimestamp(),
                };
                await addDoc(
                    collection(db, `users/${userId}/messages`),
                    botMessage
                );
            }

            setInputMessage("");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles(theme).container}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <FlatList
                data={messages}
                renderItem={({ item }) => (
                    <MessageItem item={item} theme={theme} />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles(theme).messageList}
            />
            <MessageInput
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                handleSendMessage={handleSendMessage}
                theme={theme}
            />
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
