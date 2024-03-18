import React, { useState } from "react";
import { Text, View } from "@/components/Themed";
import { StyleSheet, Button, TextInput, ImageComponent } from "react-native";
import { GenericButton } from "@/components/GenericButton";
import { GenericIconButton } from "@/components/GenericIconButton";

import {
  Email,
  Password,
  EyeSlash,
  Eye,
  Google,
  Facebook,
  Checkbox,
} from "@/assets/images/index";
import { GenericInput } from "@/components/GenericInput";
import { router } from "expo-router";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const placeHolderfunction = () => {};
  const handleSignUp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor insira um endereço de email válido.");
      return;
    }

    if (password.length < 8) {
      alert("Senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Senhas não conferem.");
      return;
    }
    console.log("SignUp button pressed");
    router.navigate("/home");
  };

  function handleGoogleSignUp() {
    console.log("Google SignUp button pressed");
    router.navigate("/home");
  }

  function handleFacebookSignUp() {
    console.log("Facebook SignUp button pressed");
    router.navigate("/home");
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const toggleShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <GenericInput
          placeholderText="Email"
          StartImageComponent={Email}
          height="20%"
        ></GenericInput>
        <GenericInput
          placeholderText="Senha"
          StartImageComponent={Password}
          EndImageComponent={showPassword ? EyeSlash : Eye}
          shouldBeSecure={!showPassword}
          onPress={toggleShowPassword}
          height="20%"
        ></GenericInput>
        <GenericInput
          placeholderText="Confimar senha"
          StartImageComponent={Password}
          EndImageComponent={showPasswordConfirm ? EyeSlash : Eye}
          shouldBeSecure={!showPasswordConfirm}
          onPress={toggleShowPasswordConfirm}
          height="20%"
        ></GenericInput>
        <View style={styles.terms}>
          <Checkbox></Checkbox>
          <View style={styles.termsText}>
            <Text>
              Concordo com os
              <Text style={styles.termsLink}> Termos de serviço </Text>e
              <Text style={styles.termsLink}> Política de privacidade</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.signInOptions}>
        <GenericButton
          title="Criar conta"
          color="#407CE2"
          onPress={placeHolderfunction}
          height={"20%"}
          width={"100%"}
        ></GenericButton>
        <View style={styles.optionsSeparator}>
          <View style={styles.separator}></View>
          <Text style={styles.optionsSeparator__text}>OU</Text>
          <View style={styles.separator}></View>
        </View>
        <View style={styles.extraOptions}>
          <GenericIconButton
            onPress={placeHolderfunction}
            text="Entrar com o Google"
            ImageComponent={Google}
          ></GenericIconButton>
          <GenericIconButton
            onPress={placeHolderfunction}
            text="Entrar com o Facebook"
            ImageComponent={Facebook}
          ></GenericIconButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    gap: 12,
    width: "80%",
    justifyContent: "center",
    height: "48%",
  },
  terms: {
    flexDirection: "row",
    width: "80%",
    gap: 10,
  },
  termsText: {
    fontSize: 13,
  },
  termsLink: {
    color: "#407CE2",
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
    marginTop: 10,
  },
  login__link: {
    color: "#407CE2",
    fontWeight: "600",
  },
  signInOptions: {
    width: "80%",
    alignItems: "center",
    justifyContent: "flex-start",
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
    height: "auto",
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
