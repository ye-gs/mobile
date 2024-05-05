import { View } from "@/components/Themed";
import { useUser } from "@/contexts/user";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { ProfileCard } from "@/components/ProfileCard";
import { Text } from "@/components/Themed";
import { Button } from "react-native-paper";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { GenderSelect } from "@/components/profile/GenderSelect";
import { TextInput } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";
export default function UserInfo() {
    const { user } = useUser();
    const { theme } = useTheme();
    const [datetime, setDatetime] = useState(
        new Date(user?.metadata.creationTime!) || new Date()
    );
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date: Date) => {
        setDatetime(date);
        hideDatePicker();
    };
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
        datepickerButton:{
            borderWidth: 1,
            borderColor: "gray",
        }
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
                    disabled={true}
                ></TextInput>
                 <Button onPress={showDatePicker} style={styles.datepickerButton}>
                    <Text style={{ color: Colors[theme].text }}>
                        Data de nascimento {" "}
                        {datetime
                            ? datetime.toLocaleString("pt-Br")
                            : "Nenhuma data selecionada"}
                    </Text>
                </Button>
                <DateTimePickerModal
                    date={datetime ? new Date(datetime) : undefined}
                    isVisible={datePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    display="default"
                    onCancel={hideDatePicker}
                />
                <GenderSelect/>
            </View>
        </KeyboardAvoidingView>
    );
}
