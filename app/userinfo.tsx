import { View, Text } from "@/components/Themed";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/contexts/theme";
import { GenderSelect } from "@/components/GenderSelect";
import { useUser } from "@/contexts/user";
export default function UserInfo() {
    const isPresented = router.canGoBack();
    const { theme } = useTheme();
    const { user } = useUser();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Olá {user?.displayName}</Text>
            <GenderSelect />
            <StatusBar style={theme} />
        </View>
    );
}
