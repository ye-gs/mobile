import { View, Text } from "@/components/Themed";
import { useTheme } from "@/contexts/theme";
import { useUser } from "@/contexts/user";
export default function UserInfo() {
    const { user } = useUser();
    const { theme } = useTheme();
    return (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text>Selecione seu tema</Text>
            <Text>Seu tema atual é: '{theme}'</Text>
        </View>
    );
}
