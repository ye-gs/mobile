import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider, useTheme } from "@/contexts/theme";
import { UserProvider } from "../contexts/user";
import { Provider } from "react-native-paper";
import Colors from "@/constants/Colors";
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
        <ThemeProvider>
            <Provider>
                <UserProvider>
                    <RootLayoutNav />
                </UserProvider>
            </Provider>
        </ThemeProvider>
    );
}

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
        </Stack>
    );
}
