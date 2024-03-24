import { ProfileCard } from "@/components/ProfileCard";
import { useUser } from "@/contexts/user";
import React from "react";
import { View, StyleSheet } from "react-native";
import { OptionButton } from "@/components/profile/OptionButton";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Profile = () => {
    const { user } = useUser();
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors[theme].background,
        },
        options: {
            top: "5%",
            height: "60%",
            justifyContent: "center",
        },
        imageComponent: {
            borderRadius: 100,
            backgroundColor: "#12312313",
        },
    });
    return (
        <View style={styles.container}>
            <ProfileCard user={user}></ProfileCard>
            <View style={styles.options}>
                <OptionButton
                    onPress={() => {
                        router.navigate("userinfo");
                    }}
                    text="Minhas informações"
                    ImageComponent={() => (
                        <AntDesign
                            name="hearto"
                            size={30}
                            color={Colors[theme].text}
                        />
                    )}
                    borderBottomWidth={1}
                ></OptionButton>
                <OptionButton
                    text="Configurações"
                    onPress={() => {
                        router.navigate("settings");
                    }}
                    ImageComponent={() => (
                        <AntDesign
                            name="setting"
                            size={30}
                            color={Colors[theme].text}
                        />
                    )}
                    borderBottomWidth={1}
                ></OptionButton>
                <OptionButton
                    text="Sobre Nós"
                    onPress={() => {
                        router.navigate("about");
                    }}
                    ImageComponent={() => (
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            size={30}
                            color={Colors[theme].text}
                        />
                    )}
                ></OptionButton>
            </View>
        </View>
    );
};

export default Profile;
