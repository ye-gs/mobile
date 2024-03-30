import { View, Text } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/contexts/theme";
import { GenderSelect } from "@/components/profile/GenderSelect";
import { useUser } from "@/contexts/user";
export default function UserInfo() {
    const { theme } = useTheme();
    const { user } = useUser();
    return (
        <View
            style={{
                width: "auto",
                height: "auto",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Olá {user?.displayName}</Text>
            <GenderSelect />
            <StatusBar style={theme} />
        </View>
    );
}
