import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { router } from "expo-router";
import { GenericInput } from "@/components/GenericInput";
import { GenericButton } from "@/components/GenericButton";
import { Email, Password, EyeSlash, Eye, Google } from "@/assets/images/index";
import { useState } from "react";
import { GenericIconButton } from "@/components/GenericIconButton";
import { ActivityIndicator } from "react-native-paper";
import { handleLoginMethods } from "@/utils/auth";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { RFValue } from "react-native-responsive-fontsize";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const { theme } = useTheme();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors[theme].background,
            color: Colors[theme].text,
        },
        form: {
            gap: RFValue(12, 808),
            width: "80%",
            justifyContent: "center",
            height: "auto",
        },
        passwordReset: {
            fontSize: RFValue(13, 808),
            alignSelf: "flex-end",
            color: "rgba(64, 124, 226, 1)",
            height: "10%",
            fontWeight: "500",
        },
        signInOptions: {
            width: "80%",
            alignItems: "center",
            height: "40%",
        },
        createAccount: {
            flexDirection: "row",
            gap: RFValue(6, 808),
        },
        createAccount__text: {
            fontSize: RFValue(14, 808),
        },
        createAccount__link: {
            color: Colors[theme].url,
            fontWeight: "600",
            fontSize: RFValue(14, 808),
        },
        optionsSeparator: {
            width: "100%",
            height: "auto",
            flexDirection: "row",
            color: "#A1A8B0",
            justifyContent: "center",
            alignItems: "center",
        },
        optionsSeparator__text: {
            color: "#A1A8B0",
            fontSize: RFValue(16, 808),
            width: "12%",
            textAlign: "center",
        },
        separator: {
            marginVertical: RFValue(20, 808),
            height: RFValue(1.5, 808),
            width: "44%",
            backgroundColor: "#A1A8B0",
        },
        extraOptions: {
            width: "100%",
            height: RFValue(60, 808),
            top: RFValue(20, 808),
        },
    });
    const { handleLogin, handleGoogleLogin } = handleLoginMethods(
        email,
        password,
        setIsLoading
    );
    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <View style={styles.form}>
                <GenericInput
                    placeholderText="Email"
                    onChange={setEmail}
                    StartImageComponent={Email}
                    height="auto"
                    paddingVertical={"6%"}
                    imageSize={RFValue(20, 808)}
                ></GenericInput>
                <GenericInput
                    placeholderText="Senha"
                    onChange={setPassword}
                    StartImageComponent={Password}
                    EndImageComponent={showPassword ? EyeSlash : Eye}
                    shouldBeSecure={!showPassword}
                    onPress={toggleShowPassword}
                    height="auto"
                    paddingVertical={"6%"}
                    imageSize={RFValue(20, 808)}
                    endImageSize={RFValue(20, 808)}
                ></GenericInput>
                <Text style={styles.passwordReset}>Esqueceu a senha?</Text>
            </View>
            <View style={styles.signInOptions}>
                <GenericButton
                    title="Entrar"
                    color={Colors[theme].altTextColor}
                    onPress={handleLogin}
                    height={"20%"}
                    width={"100%"}
                ></GenericButton>
                <View style={styles.createAccount}>
                    <Text style={styles.createAccount__text}>
                        Não tem conta?
                    </Text>
                    <Text
                        onPress={() => router.navigate("/signup")}
                        style={styles.createAccount__link}
                    >
                        Crie agora
                    </Text>
                </View>
                {isLoading ? (
                    <ActivityIndicator
                        size="large"
                        style={{ marginTop: RFValue(10, 808) }}
                        color={Colors[theme].altTextColor}
                    />
                ) : null}
                <View style={styles.optionsSeparator}>
                    <View style={styles.separator}></View>
                    <Text style={styles.optionsSeparator__text}>OU</Text>
                    <View style={styles.separator}></View>
                </View>
                <View style={styles.extraOptions}>
                    <GenericIconButton
                        onPress={handleGoogleLogin}
                        text="Entrar com o Google"
                        ImageComponent={Google}
                        imageSize={"70%"}
                        height={"100%"}
                    ></GenericIconButton>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}