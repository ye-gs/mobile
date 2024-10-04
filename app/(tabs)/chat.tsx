import React, { useState, useEffect, useRef } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    View,
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
    deleteDoc,
    getDocs,
    doc,
    getDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase/index";
import { RFValue } from "react-native-responsive-fontsize";
import MessageItem from "@/components/messages/MessageItem";
import MessageInput from "@/components/messages/MessageInput";
import Constants from "expo-constants";
import TypingMessageItem from "@/components/messages/TypingMessageItem";
import {
    getAppointmentsFromCache,
    getExamsFromCache,
    getMedsFromCache,
} from "@/cache";
import { Menu, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GeneralStyles } from "@/constants/Styles";

export default function ChatScreen() {
    const { theme } = useTheme() as { theme: string };
    const [messages, setMessages] = useState<
        {
            id: string;
            text: string;
            sender: string;
            createdAt: Date;
            isTyping: boolean;
        }[]
    >([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false); // Controla a visibilidade do menu

    const userId = auth.currentUser?.uid;
    const flatListRef = useRef<FlatList>(null);
    const navigation = useNavigation();

    interface Item {
        id: string;
        text: string;
        sender: string;
        createdAt: Date;
        isTyping: boolean;
    }

    useEffect(() => {
        if (!userId) return;

        const messagesCollectionRef = collection(
            db,
            `users/${userId}/messages`
        );
        const messagesQuery = query(
            messagesCollectionRef,
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const loadedMessages = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    text: data.text,
                    sender: data.sender,
                    createdAt: data.createdAt
                        ? data.createdAt.toDate()
                        : new Date(),
                    isTyping: false,
                };
            });

            setMessages(loadedMessages);
        });

        return () => unsubscribe();
    }, [userId]);

    const handleSendMessage = async () => {
        if (!userId || !inputMessage.trim()) return;

        const newMessage = {
            text: inputMessage,
            sender: "user",
            createdAt: serverTimestamp(),
        };

        await addDoc(collection(db, `users/${userId}/messages`), newMessage);
        setInputMessage("");
        setIsTyping(true);

        const initialPath = `users/${userId}`;
        const document = await getDoc(doc(db, initialPath));

        if (!document.exists()) {
            alert("Usuário não encontrado.");
            setIsTyping(false);
            return;
        }

        const userData = document.data();
        const weight = userData?.weight;
        const height = userData?.height;
        let bmi = weight && height ? weight / (height * height) : null;

        const gender = userData?.gender || "Desconhecido";
        const birthday = userData?.birthday?.toDate().toISOString();
        const [exams, appointments, meds] = await Promise.all([
            getExamsFromCache(userId),
            getAppointmentsFromCache(userId),
            getMedsFromCache(userId),
        ]);
        const authHeader = "Bearer " + (await auth.currentUser?.getIdToken());

        const prevMessages = messages.map((message) => ({
            content: message.text,
            role: message.sender === "user" ? "user" : "assistant",
        }));

        const body = JSON.stringify({
            weight,
            height,
            gender,
            message: inputMessage,
            bmi,
            messages: prevMessages,
            birthday,
            exams_data: exams,
            appointments_data: appointments,
            meds_data: meds,
        });

        const res = await fetch(Constants.expoConfig?.extra?.chatGptAPIUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader,
            },
            body: body,
        });

        setIsTyping(false);

        if (res.ok) {
            const data = await res.json();
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
    };

    const handleDeleteConversation = async () => {
        if (!userId) return;

        const messagesCollectionRef = collection(
            db,
            `users/${userId}/messages`
        );
        const querySnapshot = await getDocs(messagesCollectionRef);

        // Deletar todas as mensagens da coleção do usuário
        querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
        });

        setMessages([]); // Limpa as mensagens localmente
        setMenuVisible(false); // Fecha o menu
    };

    // Efeito para rolar automaticamente para o final quando o estado isTyping mudar para false
    useEffect(() => {
        if (!isTyping) {
            flatListRef.current?.scrollToEnd({ animated: true });
        }
    }, [isTyping, messages]);

    // Cabeçalho com o menu de hambúrguer
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <IconButton
                                icon="menu"
                                iconColor={Colors[theme].text}
                                size={GeneralStyles().size28}
                                onPress={() => setMenuVisible(true)}
                            />
                        }
                    >
                        <Menu.Item
                            onPress={handleDeleteConversation}
                            title="Apagar conversa"
                        />
                    </Menu>
                </View>
            ),
        });
    }, [navigation, menuVisible, theme]);

    return (
        <KeyboardAvoidingView
            style={GeneralStyles().container2}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <FlatList
                ref={flatListRef} // Adiciona referência para FlatList
                data={
                    isTyping
                        ? [...messages, { id: "typing", isTyping: true }]
                        : messages
                }
                renderItem={({ item }) =>
                    item.isTyping ? (
                        <TypingMessageItem theme={theme} />
                    ) : (
                        <MessageItem item={item as Item} theme={theme} />
                    )
                }
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
