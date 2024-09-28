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
import { useEffect, useState } from "react";
import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { updateProfile } from "firebase/auth";

export default function UserInfo() {
    const { user } = useUser();
    if (user == null) return null;
    const { theme } = useTheme();
    if (user == null) return null;
    const [userDocData, setUserDocData] = useState<DocumentData | null >(null);
    const [datetime, setDatetime] = useState<Date | null>(null);
    const [altura, setAltura] = useState<string | undefined>(undefined);
    const [peso, setPeso] = useState<string | undefined>(undefined);
    const [genero, setGenero] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>(user?.displayName || "");
    if (user == null) return;
    const userDocRef = doc(db, "users", user.uid);
    useEffect(() => {
        const fetchUserData = async () => {
            const userDoc = await getDoc(userDocRef);
            const userData = userDoc.data();
            if (userData) {
                setUserDocData(userData);
            }
            setDatetime(new Date(userData?.birthday?.seconds * 1000) || null);
            setAltura(String(userData?.height) || undefined);
            setPeso(String(userData?.weight) || undefined);
            setGenero(userData?.gender || null);
        };

        fetchUserData();
    }, [user]);

    const salvarMudancas = async () => {
        let alturaNumerica;
        let pesoNumerico;
        try {
            alturaNumerica = parseFloat(altura!);
            pesoNumerico = parseFloat(peso!);
        } catch (error) {
            alert("Altura e peso devem ser numéricos e preenchidos");
            return;
        }
        if (userName !== user?.displayName) {
            await updateProfile(user, {
                displayName: userName,
            });
        }
        await setDoc(userDocRef, {
            ...userDocData,
            birthday: datetime,
            height: alturaNumerica,
            weight: pesoNumerico,
            gender: genero,
        });
    };
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
        datepickerButton: {
            borderWidth: 1,
            borderColor: "gray",
        },
    });
    return (
        <KeyboardAvoidingView
            style={styles.container}
            keyboardVerticalOffset={RFValue(120, 808)}
            behavior="position"
            enabled={true}
        >
            <ProfileCard
                user={user}
                imageSize={150}
                paddingTop={0}
            ></ProfileCard>
            <View style={styles.options}>
                <TextInput
                    label="Nome"
                    defaultValue={userName}
                    onChangeText={(text) => setUserName(text)}
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
                <Button
                    onPress={showDatePicker}
                    style={styles.datepickerButton}
                >
                    <Text style={{ color: Colors[theme].text }}>
                        Data de nascimento{" "}
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
                <TextInput
                    label="Altura"
                    defaultValue={altura}
                    onChangeText={(text) => setAltura(text)}
                    style={styles.input}
                    inputMode="numeric"
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                    underlineColor={Colors[theme].text}
                    activeUnderlineColor={Colors[theme].altTextColor}
                ></TextInput>
                <TextInput
                    label="Peso"
                    defaultValue={peso}
                    inputMode="numeric"
                    onChangeText={(text) => setPeso(text)}
                    style={styles.input}
                    textColor={Colors[theme].text}
                    outlineColor={Colors[theme].text}
                    activeOutlineColor={Colors[theme].altTextColor}
                    underlineColor={Colors[theme].text}
                    activeUnderlineColor={Colors[theme].altTextColor}
                ></TextInput>
                <GenderSelect gender={genero} setGender={setGenero} />
                <Button onPress={salvarMudancas}>
                    <Text>Salvar</Text>
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}
