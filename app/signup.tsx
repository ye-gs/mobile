import React, { useState } from "react";
import { View } from "@/components/Themed";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { GenericIconButton } from "@/components/GenericIconButton";
import { ActivityIndicator, Checkbox, Text, Button } from "react-native-paper";
import { Email, Password, EyeSlash, Eye, Google } from "@/assets/images/index";
import { router } from "expo-router";
import { handleLoginMethods } from "@/utils/auth";
import { useUser } from "@/contexts/user";
import { GenericInput } from "@/components/GenericInput";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { GenderSelect } from "@/components/GenderSelect";

export default function SignUpScreen() {
    const { setUser } = useUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [loading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [checked, setChecked] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const toggleShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };

    const { handleGoogleLogin, handleSignUp } = handleLoginMethods(
        email,
        password,
        setIsLoading,
        setUser,
        passwordConfirm
    );

    const { theme } = useTheme();
    const colorScheme = theme;
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Colors[colorScheme ?? "light"].background,
            color: Colors[colorScheme ?? "light"].text,
        },
        socialLoginButton: {
            flexDirection: "row",
            borderWidth: 1,
            width: "100%",
            height: 50,
            alignItems: "center",
            borderRadius: 6,
            backgroundColor: Colors[colorScheme ?? "light"].background,
            color: Colors[colorScheme ?? "light"].text,
            borderColor: Colors[colorScheme ?? "light"].borderColor,
        },
        form: {
            gap: 10,
            width: "80%",
            justifyContent: "flex-end",
            height: "56%",
        },
        terms: {
            flexDirection: "row",
            width: "100%",
            gap: 10,
        },
        termsText: {
            flex: 1,
        },
        termsLink: {
            color: Colors[colorScheme ?? "light"].url,
        },
        title: {
            fontSize: 20,
            fontWeight: "bold",
        },
        login: {
            flexDirection: "row",
            gap: 6,
            fontSize: 14,
        },
        input: {
            width: "80%",
            height: 40,
            color: "gray",
            borderColor: "gray",
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        socialLoginContainer: {
            flexDirection: "row",
            gap: 25,
            justifyContent: "space-between",
        },
        login__link: {
            color: Colors[colorScheme ?? "light"].url,
            fontWeight: "600",
        },
        signInOptions: {
            width: "80%",
            alignItems: "center",
            justifyContent: "center",
        },
        createAccount: {
            flexDirection: "row",
            gap: 6,
            fontSize: 14,
        },
        createAccount__link: {
            color: "#407CE2",
            fontWeight: "600",
        },
        optionsSeparator: {
            width: "100%",
            flexDirection: "row",
            color: "#A1A8B0",
            justifyContent: "center",
            alignItems: "center",
        },
        optionsSeparator__text: {
            color: "#A1A8B0",
            fontSize: 16,
            width: "12%",
            textAlign: "center",
        },
        separator: {
            marginVertical: 20,
            height: 1.5,
            width: "44%",
            backgroundColor: "rgba(34,34,31,0.1)",
        },
        extraOptions: {
            width: "100%",
            gap: 15,
        },
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="height"
            keyboardVerticalOffset={-150}
        >
            <View style={styles.form}>
                <GenericInput
                    placeholderText="Email"
                    onChange={(e: string) => setEmail(e)}
                    StartImageComponent={Email}
                    height="16%"
                ></GenericInput>
                <GenericInput
                    placeholderText="Senha"
                    onChange={(e: string) => setPassword(e)}
                    StartImageComponent={Password}
                    EndImageComponent={showPassword ? EyeSlash : Eye}
                    shouldBeSecure={!showPassword}
                    onPress={toggleShowPassword}
                    height="16%"
                ></GenericInput>
                <GenericInput
                    placeholderText="Confimar senha"
                    onChange={(e: string) => setPasswordConfirm(e)}
                    StartImageComponent={Password}
                    EndImageComponent={showPasswordConfirm ? EyeSlash : Eye}
                    shouldBeSecure={!showPasswordConfirm}
                    onPress={toggleShowPasswordConfirm}
                    height="16%"
                ></GenericInput>
                <GenderSelect />
                <View style={styles.terms}>
                    <Checkbox
                        onPress={() => setChecked(!checked)}
                        status={checked ? "checked" : "unchecked"}
                        color={Colors[colorScheme ?? "light"].altTextColor}
                    ></Checkbox>
                    <View style={styles.termsText}>
                        <Text>
                            Concordo com os
                            <Text style={styles.termsLink}>
                                {" "}
                                Termos de serviço{" "}
                            </Text>
                            e
                            <Text style={styles.termsLink}>
                                {" "}
                                Política de privacidade
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.signInOptions}>
                <Button
                    onPress={handleSignUp}
                    style={{
                        height: "20%",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 120,
                        padding: 1,
                    }}
                    buttonColor={Colors[colorScheme ?? "light"].altTextColor}
                    textColor={Colors[colorScheme ?? "light"].text}
                    mode="contained"
                >
                    Criar conta
                </Button>
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        style={{ marginTop: 10 }}
                        color={Colors[colorScheme ?? "light"].altTextColor}
                    />
                ) : null}
                <View style={styles.createAccount}>
                    <Text>Já tem conta?</Text>
                    <Text
                        onPress={() => router.navigate("/login")}
                        style={styles.createAccount__link}
                    >
                        Entrar agora
                    </Text>
                </View>
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
                    ></GenericIconButton>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
