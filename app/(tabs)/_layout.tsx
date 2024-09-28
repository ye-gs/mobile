import React, { useEffect } from "react";
import {
    FontAwesome,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useUser } from "@/contexts/user";
import { Button, Menu } from "react-native-paper";
import { useTheme } from "@/contexts/theme";
import { auth, db } from "@/firebase";
import { StyleSheet } from "react-native";
import { ThemeNames } from "@/constants/ThemeNames";
import { doc, getDoc } from "firebase/firestore";
import { Theme } from "@/contexts/theme";
import GlucosePage from "../glucose";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    type ColorSchemeMap = {
        light: "sun-o";
        dark: "moon-o";
        blueLight: "snowflake-o";
        gray: "cloud";
        lightPink: "heart";
        limeGreen: "leaf";
        darkPurple: "star";
    };
    const colorSchemeMap: ColorSchemeMap = {
        light: "sun-o",
        dark: "moon-o",
        blueLight: "snowflake-o",
        gray: "cloud",
        lightPink: "heart",
        limeGreen: "leaf",
        darkPurple: "star",
    };
    const { theme, setTheme } = useTheme();
    const { user, setUser } = useUser();
    const styles = StyleSheet.create({
        menu: {
            backgroundColor: Colors[theme].background,
            borderColor: Colors[theme].borderColor,
            borderRadius: 10,
        },
        menuContent: {
            backgroundColor: Colors[theme].background,
            borderWidth: 1,
            borderColor: Colors[theme].borderColor,
        },
        menuItemTitle: {
            color: Colors[theme].text,
        },
    });

    useEffect(() => {
        const fetchUserTheme = async () => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setTheme(userDoc.data()?.favoriteTheme || theme);
                }
            }
        };

        fetchUserTheme();
    }, []);
    function MenuButton() {
        const [visible, setVisible] = React.useState(false);

        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        const handleSignOut = async () => {
            await auth.signOut();
            setUser(null);
            router.navigate("/login");
            closeMenu();
        };

        function switchTheme() {
            // Get available themes and filter out the current one
            const themes = ThemeNames.filter(
                (themeName) => themeName !== theme
            );
            // Pick a random theme from the remaining options
            const randomTheme =
                themes[Math.floor(Math.random() * themes.length)];
            setTheme(randomTheme); // Ensure type safety
            closeMenu();
        }

        if (!user) return null;
        const isAdmin =
            user!.email === process.env.ADMIN_EMAIL ||
            "mnomeluisguilherme@yahoo.com";

        return (
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                style={styles.menu}
                contentStyle={styles.menuContent}
                anchor={
                    <Button
                        onPress={openMenu}
                        textColor={Colors[theme].text}
                        icon={() => (
                            <FontAwesome
                                color={Colors[theme].altTextColor}
                                size={30}
                                name="bars"
                            />
                        )}
                    >
                        Menu
                    </Button>
                }
            >
                <Menu.Item
                    leadingIcon={() => (
                        <Ionicons
                            size={25}
                            name={"exit-outline"}
                            color={Colors[theme].text}
                        ></Ionicons>
                    )}
                    onPress={handleSignOut}
                    title="Sair"
                    titleStyle={styles.menuItemTitle}
                />
                <Menu.Item
                    leadingIcon={() => (
                        <FontAwesome
                            size={25}
                            name={
                                colorSchemeMap[
                                    theme as keyof ColorSchemeMap
                                ] as React.ComponentProps<
                                    typeof FontAwesome
                                >["name"]
                            }
                            color={Colors[theme].text}
                        ></FontAwesome>
                    )}
                    onPress={() => {
                        switchTheme(); // Pick a random theme
                    }}
                    title="Tema Aleatorio"
                    titleStyle={styles.menuItemTitle}
                />
                {isAdmin ? (
                    <Menu.Item
                        leadingIcon={() => (
                            <MaterialCommunityIcons
                                size={25}
                                name="test-tube"
                                color={Colors[theme].text}
                            ></MaterialCommunityIcons>
                        )}
                        onPress={() => {
                            router.navigate("/test");
                        }}
                        title="Testes"
                        titleStyle={styles.menuItemTitle}
                    />
                ) : null}
            </Menu>
        );
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[theme].tint,
                tabBarStyle: {
                    backgroundColor: Colors[theme].background,
                },
                headerStyle: {
                    backgroundColor: Colors[theme].background,
                },
                headerTitleStyle: {
                    color: Colors[theme].text,
                },
                headerRight: () => <MenuButton />,
                headerShown: useClientOnlyValue(false, true),
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="appointments"
                options={{
                    title: "Consultas",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="calendar" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="exams"
                options={{
                    title: "Exames",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="wpforms" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: "Chat",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="comments" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="meds"
                options={{
                    title: "Medicação",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="bell" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
