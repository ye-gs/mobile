import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Link, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ThemeProvider } from "@/contexts/theme";
import { UserProvider } from "../contexts/user";
import { Provider } from "react-native-paper";
export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    initialRouteName: "index",
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

    return <RootLayoutNav />;
}

function RootLayoutNav() {
    return (
        <ThemeProvider>
            <Provider>
                <UserProvider>
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
                                        />
                                    </Link>
                                ),

                                headerShown: true,
                                headerTitle: "Suas Informações",
                                headerTitleAlign: "center",
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
                                        />
                                    </Link>
                                ),
                                headerShown: true,
                                headerTitle: "Configurações",
                                headerTitleAlign: "center",
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
                                        />
                                    </Link>
                                ),
                                headerShown: true,
                                headerTitle: "Sobre nós",
                                headerTitleAlign: "center",
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
                                        />
                                    </Link>
                                ),
                                headerShown: true,
                                headerTitle: "Detalhes da Consulta",
                                headerTitleAlign: "center",
                            }}
                        />
                    </Stack>
                </UserProvider>
            </Provider>
        </ThemeProvider>
    );
}
