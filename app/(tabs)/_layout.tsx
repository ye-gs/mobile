import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs, router } from "expo-router";
import Colors from "@/constants/Colors";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useUser } from "@/contexts/user";
import { Button, Menu } from "react-native-paper";
import { useTheme } from "@/contexts/theme";
import { auth } from "@/firebase";

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
                style={{
                    backgroundColor: Colors[theme].background,
                    borderColor: Colors[theme].borderColor,
                    borderWidth: 1,
                }}
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
                <Menu.Item onPress={handleSignOut} title="Sair" />
                <Menu.Item
                    leadingIcon={() => (
                        <FontAwesome
                            size={25}
                            name={colorSchemeMap[theme]}
                        ></FontAwesome>
                    )}
                    onPress={() => {
                        switchTheme();
                    }}
                    title="Mudar tema"
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
