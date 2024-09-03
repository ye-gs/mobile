import { Separator } from "@/components/Separator";
import { ProfileCard } from "@/components/ProfileCard";
import { StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { HomeAppointmentHistory } from "@/components/home/HomeAppointmentHistory";
import { useUser } from "@/contexts/user";
import { HomeRoutingOptions } from "@/components/home/HomeRoutingOptions";
import { HomeBiometricInfo } from "@/components/home/HomeBiometricInfo";
import { router } from "expo-router";
import { useEffect } from "react";

export default function Home() {
    const { user } = useUser();
    useEffect(() => {
        () => {
            if (user === null) {
                router.navigate("/index");
                return null;
            }
        };
    }, [user]);
    return (
        <View style={styles.container}>
            <ProfileCard user={user} />
            <HomeBiometricInfo />
            <Separator />
            <HomeRoutingOptions />
            <HomeAppointmentHistory />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
});