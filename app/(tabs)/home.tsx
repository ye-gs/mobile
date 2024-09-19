import { Separator } from "@/components/Separator";
import { ProfileCard } from "@/components/ProfileCard";
import { StyleSheet, Button, Alert } from "react-native";
import { View } from "@/components/Themed";
import { HomeAppointmentHistory } from "@/components/home/HomeAppointmentHistory";
import { useUser } from "@/contexts/user";
import { HomeRoutingOptions } from "@/components/home/HomeRoutingOptions";
import { HomeBiometricInfo } from "@/components/home/HomeBiometricInfo";
import { router } from "expo-router";
import { useEffect } from "react";
import { CacheButtons } from "@/components/debug/cacheButtons";
import { PostExams} from "@/components/debug/postExams";

export default function Home() {
    const { user } = useUser();
    
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
            <HomeAppointmentHistory />
            <CacheButtons />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});