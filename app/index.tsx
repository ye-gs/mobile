import { StyleSheet, Image } from "react-native";
import { View } from "@/components/Themed";
import { router } from "expo-router";
import { GenericButton } from "@/components/GenericButton";

export default function Home() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/adaptive-icon.png")}
                style={styles.logo}
            />
            <GenericButton
                title="Login"
                onPress={() => router.navigate("login")}
                width={"80%"}
                height={"5%"}
            />
            <GenericButton
                title="Signup"
                onPress={() => router.navigate("signup")}
                width={"80%"}
                height={"5%"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    logo: {
        width: "80%",
        maxHeight: "50%", // Added a maxHeight to ensure the logo doesn't get too large
        resizeMode: "contain",
    },
    
});
