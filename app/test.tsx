import TestApp from "@/components/Notification";
import { View } from "@/components/Themed";
import { router } from "expo-router";
import { Button } from "react-native-paper";
export default function UserInfo() {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Button onPress={() => router.navigate("/home")}> vOLTAR</Button>
            <TestApp />
        </View>
    );
}
