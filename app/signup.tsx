import React, { useState } from "react";
import { View } from "@/components/Themed";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { GenericIconButton } from "@/components/GenericIconButton";
import { ActivityIndicator, Checkbox, Text, Button } from "react-native-paper";
import { Email, Password, EyeSlash, Eye, Google } from "@/assets/images/index";
import { router } from "expo-router";
import { handleLoginMethods } from "@/utils/auth";
import { GenericInput } from "@/components/GenericInput";
import Colors from "@/constants/Colors";
import { useTheme } from "@/contexts/theme";
import { GenderSelect } from "@/components/GenderSelect";
import { RFValue } from "react-native-responsive-fontsize";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { useHeaderHeight } from '@react-navigation/elements'

export default function SignUpScreen() {
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
        passwordConfirm
    );
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
            justifyContent: 'space-between',
            width: "80%",
            height: "35%",
        },
        terms: {
            flexDirection: "row",
            width: "100%",
        },
        termsTextView:{
            flex:1,
            textAlignVertical: 'center',
            
        },
        termsText: {
            color: Colors[theme].text,
            fontSize: RFValue(13, 808)
        },
        termsLink: {
            color: Colors[theme].url,
        },
        signInOptions: {
            width: "80%",
            alignItems: "center",
            borderColor: 'black',
            top: '3%'
        },
        createAccount: {
            flexDirection: "row",
            gap: RFValue(6, 808)
        },
        createAccount__text:{
            color: Colors[theme].text,
            fontSize: RFValue(14, 808),
        },
        createAccount__link: {
            color: "#407CE2",
            fontWeight: "600",
            fontSize: RFValue(14, 808),
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
        buttonLabelStyle:{
            fontSize: RFValue(16, 808),
            color: '#fff',
            textAlignVertical: 'center',
            height: 'auto'
        }
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="height"
            keyboardVerticalOffset={RFValue(-300, 808)  }
        >
            <View style={styles.form}>
                <GenericInput
                    placeholderText="Email"
                    onChange={(e: string) => setEmail(e)}
                    StartImageComponent={Email}
                    height="25%"
                    imageSize={'90%'}
                ></GenericInput>
                <GenericInput
                    placeholderText="Senha"
                    onChange={(e: string) => setPassword(e)}
                    StartImageComponent={Password}
                    EndImageComponent={showPassword ? EyeSlash : Eye}
                    shouldBeSecure={!showPassword}
                    onPress={toggleShowPassword}
                    height="25%"
                    imageSize={'90%'}
                    endImageSize={'60%'}
                ></GenericInput>
                <GenericInput
                    placeholderText="Confimar senha"
                    onChange={(e: string) => setPasswordConfirm(e)}
                    StartImageComponent={Password}
                    EndImageComponent={showPasswordConfirm ? EyeSlash : Eye}
                    shouldBeSecure={!showPasswordConfirm}
                    onPress={toggleShowPasswordConfirm}
                    height="25%"
                    imageSize={'90%'}
                    endImageSize={'60%'}
                ></GenericInput>
                <View style={styles.terms}>
                    <Checkbox
                        onPress={() => setChecked(!checked)}
                        status={checked ? "checked" : "unchecked"}
                        color={Colors[theme].altTextColor}
                    ></Checkbox>
                    <View style={styles.termsTextView}>
                        <Text style={styles.termsText}>
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
                        padding: RFValue(1, 808),
        
                    }}
                    buttonColor={Colors[theme].altTextColor}
                    textColor={Colors[theme].text}
                    mode="contained"
                    maxFontSizeMultiplier={RFValue(20, 808)}
                    labelStyle={styles.buttonLabelStyle}
                
                >
                    Criar conta
                </Button>
                {loading ? (
                    <ActivityIndicator
                        size="large"
                        style={{ marginTop: 10 }}
                        color={Colors[theme].altTextColor}
                    />
                ) : null}
                <View style={styles.createAccount}>
                    <Text style={styles.createAccount__text}>Já tem conta?</Text>
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
                        imageSize={'70%'}
                        height={'100%'}
                    ></GenericIconButton>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}
