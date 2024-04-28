import { View, Text } from "@/components/Themed";
import { useUser } from "@/contexts/user";
import { StyleSheet } from "react-native";
import { ProfileCard } from "@/components/ProfileCard";
import { RFValue } from "react-native-responsive-fontsize";
import { GenderSelect } from "@/components/profile/GenderSelect";
import { useTheme } from "@/contexts/theme";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-paper";
import { GenericButton } from "@/components/GenericButton";
export default function UserInfo() {
    const { user } = useUser();
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: RFValue(10, 808),
        },
        options: {
            height: "50%",
            width: "80%",
            gap: 10
        },
        input:{
            backgroundColor: Colors[theme].background,
        }
    });
    return (
        <View style={styles.container}>
            <ProfileCard
                user={user}
                imageSize={150}
                paddingTop={0}
            ></ProfileCard>
            <View style={styles.options}>
                <TextInput
                    label={<Text style={{color: Colors[theme].text}}>Nome</Text>}
                    placeholder="Nome"
                    defaultValue={user?.displayName || "Nome"}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                />
                <TextInput
                    label={<Text style={{color: Colors[theme].text}}>Email</Text>}
                    placeholder="Email"
                    defaultValue={user?.email || "Email"}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}

                />
                <TextInput
                    label={<Text style={{color: Colors[theme].text}}>Data de nascimento</Text>}
                    placeholder="Data de nascimento"
                    defaultValue={user?.metadata.creationTime}
                    mode="outlined"
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                />
                <GenderSelect />
                <GenericButton height={RFValue(40, 808)} title="Salvar" onPress={() => console.log("OK")}/>
            </View>
        </View>
    );
}
