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
import { RFValue } from "react-native-responsive-fontsize";

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
        circle: {
            backgroundColor: Colors[theme].circleBackground,
            padding: 5,
            borderRadius: 15,
            overflow: "hidden",
        },
        shadow: {
            shadowColor: "#000", // Shadow color
            shadowOffset: { width: 0, height: 2 }, // Shadow offset
            shadowOpacity: 0.25, // Shadow opacity
            shadowRadius: 3.84, // Shadow radius
            elevation: 5, // Elevation for Android shadow
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
                            size={RFValue(30, 808)}
                            color={Colors[theme].tint}
                            style={styles.circle}
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
                            size={RFValue(30, 808)}
                            color={Colors[theme].tint}
                            style={styles.circle}
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
                            size={RFValue(30, 808)}
                            color={Colors[theme].tint}
                            style={styles.circle}
                        />
                    )}
                ></OptionButton>
            </View>
        </View>
    );
};

export default Profile;