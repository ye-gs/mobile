import { View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/contexts/theme";
export default function Modal() {
    const isPresented = router.canGoBack();
    const { theme } = useTheme();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            {!isPresented && <Link href="../">Dismiss</Link>}
            <StatusBar style={theme} />
        </View>
    );
}
