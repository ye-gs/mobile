import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import {
    ErrorBoundary,
    ErrorBoundaryProps,
    Link,
    router,
    Stack,
} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "@/contexts/theme";
import { UserProvider } from "../contexts/user";
import { Provider } from "react-native-paper";
import Colors from "@/constants/Colors";
import { Try } from "expo-router/build/views/Try";
import Constants from "expo-constants";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    initialRouteName: "/(tabs)/home",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <Try catch={createCardOnError}>
            <ThemeProvider>
                <Provider>
                    <UserProvider>
                        <RootLayoutNav />
                    </UserProvider>
                </Provider>
            </ThemeProvider>
        </Try>
    );
}

const createCardOnError: React.FC<ErrorBoundaryProps> = ({ error }) => {
    const message: string = error.message || error.toString();
    const stack: string = error.stack || "Sem stack disponível";
    const name: string = error.name ? error.name : "Ocorreu um erro";
    const cause: string = error.cause
        ? error.cause.toString()
        : "Sem causa disponível";
    const description: string = `Nome do erro: ${name} - Mensagem: ${message}\n\nCausa: ${cause.toString()}`;

    if (Constants.expoConfig?.extra?.nodeEnv === "production") {
        const url: string = Constants.expoConfig?.extra?.webhookUrl || "";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data: {
                    description: description,
                    summary: `${name} - ${message}`,
                },
            }),
        });
    }
    return (
        <ErrorBoundary
            error={error}
            retry={async () => {
                await new Promise<void>((resolve) => {
                    (router.canGoBack() && router.back()) ||
                        router.navigate("/(tabs)/home");
                    resolve();
                });
            }}
        />
    );
};

function RootLayoutNav() {
    const { theme } = useTheme();
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="signup" />
            <Stack.Screen
                name="userinfo"
                options={{
                    headerLeft: () => (
                        <Link href="/profile">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Suas Informações",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen
                name="settings"
                options={{
                    headerLeft: () => (
                        <Link href="/profile">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Configurações",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen
                name="about"
                options={{
                    headerLeft: () => (
                        <Link href="/profile">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Sobre nós",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen
                name="test"
                options={{
                    headerLeft: () => (
                        <Link href="/home">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Teste de Tela",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
                name="appointments/[slug]"
                options={{
                    headerLeft: () => (
                        <Link href="/appointments">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Detalhes da Consulta",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen
                name="meds/[slug]"
                options={{
                    headerLeft: () => (
                        <Link href="/meds">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Detalhes da Medicação",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen
                name="exams/[slug]"
                options={{
                    headerLeft: () => (
                        <Link href="/exams">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Detalhes do Laudo Evolutivo",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen
                name="glucose"
                options={{
                    headerLeft: () => (
                        <Link href="/home">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Medidas de Glicose",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
            <Stack.Screen
                name="pressure"
                options={{
                    headerLeft: () => (
                        <Link href="/home">
                            <FontAwesome
                                size={38}
                                name="arrow-left"
                                color={Colors[theme].text}
                            />
                        </Link>
                    ),
                    headerShown: true,
                    headerTitle: "Medidas de Pressão",
                    headerTitleAlign: "center",
                    headerStyle: {
                        backgroundColor: Colors[theme].background,
                    },
                    headerTitleStyle: { color: Colors[theme].text },
                }}
            />
        </Stack>
    );
}
