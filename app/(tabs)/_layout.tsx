import React from "react";
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
import { auth } from "@/firebase";
import { StyleSheet } from "react-native";

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    type ColorSchemeMap = {
        light: "moon-o";
        dark: "sun-o";
    };
    const colorSchemeMap: ColorSchemeMap = {
        light: "moon-o",
        dark: "sun-o",
    };

    const { theme, setTheme } = useTheme();
    const { setUser } = useUser();
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
            setTheme(theme === "light" ? "dark" : "light");
            closeMenu();
        }

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
                            name={colorSchemeMap[theme]}
                            color={Colors[theme].text}
                        ></FontAwesome>
                    )}
                    onPress={() => {
                        switchTheme();
                    }}
                    title="Mudar tema"
                    titleStyle={styles.menuItemTitle}
                />
                <Menu.Item
                    leadingIcon={() => (
                        <MaterialCommunityIcons
                            size={25}
                            name="test-tube"
                            color={Colors[theme].text}
                        ></MaterialCommunityIcons>
                    )}
                    onPress={() => {
                        router.navigate("../test");
                    }}
                    title="Testes"
                    titleStyle={styles.menuItemTitle}
                />
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
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
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
