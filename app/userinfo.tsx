import { View } from "@/components/Themed";
import { useUser } from "@/contexts/user";
import { StyleSheet } from "react-native";
import { ProfileCard } from "@/components/ProfileCard";
import { OptionButton } from "@/components/profile/OptionButton";
import { RFValue } from "react-native-responsive-fontsize";
import { GenderSelect } from "@/components/profile/GenderSelect";

export default function UserInfo() {
    const { user } = useUser();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: RFValue(10, 808),
        },
        options: {
            height: "50%",
        },
    });
    return (
        <View style={styles.container}>
            <ProfileCard
                user={user}
                imageSize={150}
                paddingTop={0}
            ></ProfileCard>
            <View style={styles.options}>
                <OptionButton
                    text={"Nome: " + user?.displayName}
                    borderBottomWidth={1}
                    fontWeight="600"
                ></OptionButton>
                <GenderSelect />
                <OptionButton
                    text={"Email: " + user?.email}
                    borderBottomWidth={1}
                    fontWeight="600"
                ></OptionButton>
                <OptionButton
                    text={"Data de nascimento: " + user?.metadata.creationTime}
                    borderBottomWidth={1}
                    fontWeight="600"
                ></OptionButton>
            </View>
        </View>
    );
}
