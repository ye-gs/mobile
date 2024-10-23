import React, { useState, useEffect, useRef } from "react";
import { FlatList, KeyboardAvoidingView, Platform, View } from "react-native";
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
import MessageItem from "@/components/messages/MessageItem";
import MessageInput from "@/components/messages/MessageInput";
import TypingMessageItem from "@/components/messages/TypingMessageItem";
import {
    getAppointmentsFromCache,
    getExamsFromCache,
    getMedsFromCache,
} from "@/cache";
import { Menu, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GeneralStyles } from "@/constants/Styles";
import Constants from "expo-constants";
import { useUser } from "@/contexts/user";

export default function ChatScreen() {
    const { theme } = useTheme() as { theme: string };
    const [messages, setMessages] = useState<Item[]>([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const userId = auth.currentUser?.uid;
    const flatListRef = useRef<FlatList>(null);
    const navigation = useNavigation();
    const { user } = useUser();
    interface Item {
        id: string;
        text: string;
        sender: string;
        createdAt: Date;
        isTyping: boolean;
    }

    // Função para rolar até o final da lista
    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    // Função para carregar mensagens do Firestore
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
            const loadedMessages = snapshot.docs.map((doc) => ({
                id: doc.id,
                text: doc.data().text,
                sender: doc.data().sender,
                createdAt: doc.data().createdAt?.toDate() || new Date(),
                isTyping: false,
            }));

            setMessages(loadedMessages);
            scrollToBottom(); // Sempre rola para o final quando as mensagens forem atualizadas
        });

        return () => unsubscribe();
    }, [userId]);

    // Enviar mensagem para o Firestore e rolar para o fim da lista
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
        scrollToBottom();

        try {
            const document = await getDoc(doc(db, `users/${userId}`));
            if (!document.exists()) {
                alert("Usuário não encontrado.");
                setIsTyping(false);
                return;
            }

            const userData = document.data();
            const bmi =
                userData?.weight && userData?.height
                    ? userData.weight / (userData.height * userData.height)
                    : null;

            const body = JSON.stringify({
                uname: user?.displayName || "Usuário",
                uid: userId,
                weight: userData?.weight,
                height: userData?.height,
                gender: userData?.gender || "Desconhecido",
                message: inputMessage,
                bmi,
                messages: messages.map((message) => ({
                    content: message.text,
                    role: message.sender === "user" ? "user" : "assistant",
                })),
                birthday: userData?.birthday?.toDate().toISOString(),
                exams_data: await getExamsFromCache(userId),
                appointments_data: await getAppointmentsFromCache(userId),
                meds_data: await getMedsFromCache(userId),
            });

            const apiUrl = Constants.expoConfig?.extra?.chatGptAPIUrl;
            //const apiUrl = "http://192.168.0.86:9000/2015-03-31/functions/function/invocations";
            const authHeader =
                "Bearer " + (await auth.currentUser?.getIdToken());
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader,
                },
                body: body,
            });

            const responseText = await res.text();
            const parsedResponse = JSON.parse(responseText);
            const botMessage = {
                text: parsedResponse.body?.message || parsedResponse.message,
                sender: "bot",
                createdAt: serverTimestamp(),
            };

            await addDoc(
                collection(db, `users/${userId}/messages`),
                botMessage
            );
        } catch (error) {
            console.error("Erro ao enviar a requisição:", error);
        }

        setIsTyping(false);
    };

    const handleDeleteConversation = async () => {
        if (!userId) return;

        const messagesCollectionRef = collection(
            db,
            `users/${userId}/messages`
        );
        const querySnapshot = await getDocs(messagesCollectionRef);

        // Deletar todas as mensagens da coleção do usuário
        await Promise.all(querySnapshot.docs.map((doc) => deleteDoc(doc.ref)));
        setMessages([]); // Limpa as mensagens localmente
        setMenuVisible(false); // Fecha o menu
    };

    // Configura o cabeçalho com o menu
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
                ref={flatListRef}
                data={
                    isTyping
                        ? [...messages, { id: "typing", isTyping: true }]
                        : messages
                }
                renderItem={({ item }) =>
                    item.isTyping ? (
                        <TypingMessageItem theme={theme} />
                    ) : (
                        <MessageItem item={item} theme={theme} />
                    )
                }
                keyExtractor={(item) => item.id}
                contentContainerStyle={GeneralStyles().messageList1}
                onContentSizeChange={scrollToBottom} // Garante que o scroll esteja sempre no final
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
