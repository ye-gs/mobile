import { Separator } from "@/components/Separator";
import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { HomeAppointmentHistory } from "@/components/home/HomeAppointmentHistory";
import { useUser } from "@/contexts/user";
import { HomeRoutingOptions } from "@/components/home/HomeRoutingOptions";
import { HomeBiometricInfo } from "@/components/home/HomeBiometricInfo";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { AddButton } from "@/components/AddButton";
import { useTheme } from "@/contexts/theme";

export default function Home() {
    const { user } = useUser();
    const { theme } = useTheme();
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.navigate("/index");
            return undefined;
        }
    }, [user]);
    return (
        <View style={styles.container}>
            <HomeBiometricInfo />
            <Separator />
            <HomeRoutingOptions />
            <View style={styles.cadastroContainer}>
                <Text style={styles.cadastroTitle}>Cadastro de glicose</Text>
                <AddButton
                    theme={theme}
                    onPress={() => router.navigate("/glucose")}
                />
            </View>
            <View style={styles.cadastroContainer}>
                <Text style={styles.cadastroTitle}>Cadastro de pressão</Text>
                <AddButton
                    theme={theme}
                    onPress={() => router.navigate("/pressure")}
                />
            </View>
            <HomeAppointmentHistory />
        </View>
    );
}

const colors = {
    primary: "#333",
    secondary: "#fff",
    background: "#f5f5f5",
    cardBackground: "#fff",
    cardBorder: "#ddd",
    buttonBackground: "#007BFF",
    buttonText: "#FFF",
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    cadastroContainer: {
        alignItems: "center",
        padding: 10,
    },
    cadastroTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.primary,
        marginBottom: 10,
    },
});
