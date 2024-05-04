import { View } from "@/components/Themed";
import { useUser } from "@/contexts/user";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { ProfileCard } from "@/components/ProfileCard";
import { OptionButton } from "@/components/profile/OptionButton";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { GenderSelect } from "@/components/profile/GenderSelect";
import { TextInput } from "react-native-paper";
export default function UserInfo() {
    const { user } = useUser();
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: RFValue(10, 808),
            backgroundColor: Colors[theme].background,
        },
        options: {
            height: "50%",
            gap: RFValue(10, 808),
        },
        input: {
            backgroundColor: Colors[theme].background,
        },
    });
    return (
        <KeyboardAvoidingView style={styles.container} keyboardVerticalOffset={RFValue(120, 808)} behavior="position" enabled={true}>
            <ProfileCard
                user={user}
                imageSize={150}
                paddingTop={0}
            ></ProfileCard>
            <View style={styles.options}>
                <TextInput
                    label="Nome"
                    defaultValue={user?.displayName!}
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                    underlineColor={Colors[theme].text}
                    activeUnderlineColor={Colors[theme].altTextColor}
                ></TextInput>
                <TextInput
                    label="Email"
                    defaultValue={user?.email!}
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                    underlineColor={Colors[theme].text}
                    activeUnderlineColor={Colors[theme].altTextColor}
                ></TextInput>
                <TextInput
                    label="Data de Nascimento"
                    defaultValue={user?.metadata.creationTime!}
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                    underlineColor={Colors[theme].text}
                    activeUnderlineColor={Colors[theme].altTextColor}
                    placeholderTextColor={Colors[theme].altTextColor}
                ></TextInput>
                <GenderSelect />
            </View>
        </KeyboardAvoidingView>
    );
}
