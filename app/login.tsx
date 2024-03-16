import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { GenericInput } from '@/components/GenericInput';
import { GenericButton } from '@/components/GenericButton';
import { Email, Password, EyeSlash, Eye, Google, Facebook } from "@/assets/images/index";
import { useState } from 'react';
import { GenericIconButton } from '@/components/GenericIconButton';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/index";
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';


export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      alert("Email inválido")
      return;
    }
    if (password.length < 6) {
      alert("Senha deve ter no mínimo 6 caracteres")
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.navigate("/home")
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(
          `Erro ao fazer login: ${errorCode} - ${errorMessage}`
        )
        return;
      });
  };


  const handleGoogleLogin = async () => {
    //   try {
    //     await GoogleSignin.hasPlayServices();
    //     const userInfo = await GoogleSignin.signIn();
    //     console.log({ userInfo, error: undefined });
    //     router.navigate("/home")
    //     return userInfo
    //   } catch (error: unknown) {
    //     if (error instanceof Error && "code" in error) {
    //       switch (error.code) {
    //         case statusCodes.SIGN_IN_CANCELLED:
    //           // user cancelled the login flow
    //           break;
    //         case statusCodes.IN_PROGRESS:
    //           // operation (eg. sign in) already in progress
    //           break;
    //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //           // play services not available or outdated
    //           break;
    //         default:
    //         // some other error happened
    //       }
    //     } else {
    //       // an error that's not related to google sign in occurred
    //     }
    //   }
    // };
    console.log("Google login")
  }


  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
    console.log("Facebook login")
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <GenericInput placeholderText='Email' onChange={setEmail} StartImageComponent={Email} height="20%"></GenericInput>
        <GenericInput placeholderText='Senha' onChange={setPassword} StartImageComponent={Password} EndImageComponent={showPassword ? EyeSlash : Eye} shouldBeSecure={!showPassword} onPress={toggleShowPassword} height="20%"></GenericInput>
        <Text style={styles.passwordReset}>Esqueceu a senha?</Text>
      </View>
      <View style={styles.signInOptions}>
        <GenericButton title="Entrar" color="#407CE2" onPress={handleLogin} height={"20%"} width={"100%"}></GenericButton>
        <View style={styles.createAccount}>
          <Text>Não tem conta?</Text><Text onPress={() => router.navigate("/signup")} style={styles.createAccount__link}>Crie agora</Text>
        </View>
        <View style={styles.optionsSeparator}>
          <View style={styles.separator}></View><Text style={styles.optionsSeparator__text}>OU</Text><View style={styles.separator}></View>
        </View>
        <View style={styles.extraOptions}>
          <GenericIconButton onPress={handleGoogleLogin} text="Entrar com o Google" ImageComponent={Google}></GenericIconButton>
          <GenericIconButton onPress={handleFacebookLogin} text="Entrar com o Facebook" ImageComponent={Facebook}></GenericIconButton>
        </View>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    gap: 12,
    width: '80%',
    justifyContent: 'center',
  },
  passwordReset: {
    fontSize: 13,
    alignSelf: 'flex-end',
    color: 'rgba(64, 124, 226, 1)',
    fontWeight: '500',
  },
  signInOptions: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  createAccount: {
    flexDirection: 'row',
    gap: 6,
    fontSize: 14
  },
  createAccount__link: {
    color: '#407CE2',
    fontWeight: '600',
  },
  optionsSeparator: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    color: '#A1A8B0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  optionsSeparator__text: {
    color: '#A1A8B0',
    fontSize: 16,
    width: '12%',
    textAlign: 'center'
  },
  separator: {
    marginVertical: 20,
    height: 1.5,
    width: "44%",
    backgroundColor: 'rgba(34,34,31,0.1)'
  },
  extraOptions: {
    width: "100%",
    gap: 15
  }
});
