import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, router } from 'expo-router';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useUser } from '@/contexts/user';
import { Button, Menu } from 'react-native-paper';
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>['name'];
    color: string;
}) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const { setUser } = useUser()

    function MenuButton() {
        const [visible, setVisible] = React.useState(false);

        const openMenu = () => setVisible(true);
        const closeMenu = () => setVisible(false);

        const handleSignOut = () => {
            setUser(null);
            router.navigate("/login");
            closeMenu();
        };

        return (
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <Button
                        icon={() => <FontAwesome size={20} name="bars" />}
                        onPress={openMenu} textColor='#407CE2'
                    >Menu</Button>
                }
            >
                <Menu.Item onPress={handleSignOut} title="Sair" />
            </Menu >
        );
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // Disable the static render of the header on web
                // to prevent a hydration error in React Navigation v6.
                headerRight: () => <MenuButton />,
                headerShown: useClientOnlyValue(false, true),
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="appointments"
                options={{
                    title: 'Consultas',
                    tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: 'Exames',
                    tabBarIcon: ({ color }) => <TabBarIcon name="camera" color={color} />,
                }}
            />
            <Tabs.Screen
                name="meds"
                options={{
                    title: 'Medicação',
                    tabBarIcon: ({ color }) => <TabBarIcon name="medkit" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Perfil',
                    tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
                }}
            />
        </Tabs>
    );
}