import { ProfileCard } from "@/components/ProfileCard";
import { useUser } from "@/contexts/user";
import React from "react";
import { View, StyleSheet } from "react-native";

const Profile = () => {
    const { user } = useUser();

    return (
        <View style={styles.container}>
            <ProfileCard user={user}></ProfileCard>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
});

export default Profile;
