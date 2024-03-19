import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { router } from 'expo-router';
import { GenericInput } from '@/components/GenericInput';
import { GenericButton } from '@/components/GenericButton';
import { Email, Password, EyeSlash, Eye, Google, Facebook, Heartbeat } from "@/assets/images/index";
import { useState } from 'react';
import { GenericIconButton } from '@/components/GenericIconButton';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/index";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { signInWithCredential } from 'firebase/auth';
import { AccessToken, LoginManager } from "react-native-fbsdk-next";
import { UserProvider, useUser } from "../contexts/user";

GoogleSignin.configure({
  webClientId: "147160860966-am6ip3ii0mro78t0rld4rrp3gmufrcqa.apps.googleusercontent.com"
});



export default function Home() {
  const { setUser } = useUser();
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
        setUser(user)
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
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      const user = await signInWithCredential(auth, googleCredential);
      console.log(user.user.displayName)
      setUser(user.user)
      router.navigate("/home")
      GoogleSignin.signOut();
      return user;
    } catch (error) {
      if (error instanceof Error && "code" in error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
          alert("Google login cancelled")
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
          alert("Google login in progress")
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
          alert("Google login play services not available")
        } else {
          // some other error happened
          alert(error)
        }
        return;
      }
    }
  }

  const handleVagabundoLogin = async () => {
    router.navigate("home")
  }


  const handleFacebookLogin = async () => {
    console.log("Facebook login 3")
    // Attempt a login using the Facebook login dialog asking for default permissions.
    await LoginManager.logInWithPermissions(["public_profile"]).then(
      async function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
          return;
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions?.toString()
          );
          const accessTokenResponse = await AccessToken.getCurrentAccessToken();
          console.log(accessTokenResponse?.accessToken);
          if (accessTokenResponse === null) {
            console.log("No access token");
            return;
          };
          const facebookCredential = FacebookAuthProvider.credential(accessTokenResponse.accessToken);
          const user = await signInWithCredential(auth, facebookCredential);
          setUser(user.user)
          console.log(user.user.displayName)
          LoginManager.logOut();
          router.navigate("/home")
          return result;

        }
      },
      function (error) {
        alert("Login fail with error: " + error);
        return;
      }
    );
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <UserProvider>
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
            <GenericIconButton onPress={handleVagabundoLogin} text="Sou Vagabundo" ImageComponent={Heartbeat}></GenericIconButton>
          </View>
        </View>

      </View>
    </UserProvider>
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
