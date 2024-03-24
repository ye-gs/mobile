import { View } from "react-native";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/contexts/theme";
import { Text } from "react-native";
export default function Modal() {
    const isPresented = router.canGoBack();
    const { theme } = useTheme();
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Modal</Text>

            {/* add back button on header*/}
            {isPresented && <Link href="../">Back</Link>}
            <StatusBar style={theme} />
        </View>
    );
}
