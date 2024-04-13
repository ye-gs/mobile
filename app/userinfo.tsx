import { View, Text } from "@/components/Themed";
import { useTheme } from "@/contexts/theme";
import { GenderSelect } from "@/components/profile/GenderSelect";
import { useUser } from "@/contexts/user";
import { StyleSheet } from "react-native";
import { ProfileCard } from "@/components/ProfileCard";
import { OptionButton } from "@/components/profile/OptionButton";
import { RFValue } from "react-native-responsive-fontsize";

export default function UserInfo() {
    const { theme } = useTheme();
    const { user } = useUser();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: RFValue(10,808)
        },
        options: {
            height: "50%",
        },
    });
    return (
        <View style={styles.container}>
            <ProfileCard user={user} imageSize={150} paddingTop={0}></ProfileCard>
            <View style={styles.options}>
                <OptionButton
                    text="CPF: 000.000.000-00"
                    borderBottomWidth={1}
                    fontWeight="600"
                ></OptionButton>
                <OptionButton
                    text="Nome: Jane"
                    borderBottomWidth={1}
                    fontWeight="600"
                ></OptionButton>
                <OptionButton
                    text="Gênero: Feminino"
                    borderBottomWidth={1}
                    fontWeight="600"
                ></OptionButton>
                <OptionButton
                    text="Email: doutor@flamingo.com"
                    borderBottomWidth={1}
                    fontWeight="600"
                ></OptionButton>
            </View>
        </View>
    );
}
