import { auth } from "@/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithCredential,
    UserCredential,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";

function handleLoginMethods(
    email: string,
    password: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    passwordConfirm?: string
) {
    const handleLogin = () => {
        const emailRegex: RegExp =
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            alert("Email inválido");
            return;
        }
        if (password.length < 6) {
            alert("Senha deve ter no mínimo 6 caracteres");
            return;
        }
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                return await processUserCredentialAndRedirect(
                    userCredential,
                    setIsLoading
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Erro ao fazer login: ${errorCode} - ${errorMessage}`);
                setIsLoading(false);
                return;
            });
    };
    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(
                userInfo.idToken
            );

            const userCredential = await signInWithCredential(
                auth,
                googleCredential
            );
            if (userCredential === null) {
                setIsLoading(false);
                alert("Erro ao fazer login com Google");
                return;
            }
            return await processUserCredentialAndRedirect(
                userCredential,
                setIsLoading
            );
        } catch (error) {
            if (error instanceof Error && "code" in error) {
                if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                    // user cancelled the login flow
                    alert("Google login cancelled");
                } else if (error.code === statusCodes.IN_PROGRESS) {
                    // operation (e.g. sign in) is in progress already
                    alert("Google login in progress");
                } else if (
                    error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
                ) {
                    // play services not available or outdated
                    alert("Google login play services not available");
                } else {
                    // some other error happened
                    alert(error);
                }
                setIsLoading(false);
                return;
            }
        }
    };
    const handleSignUp = () => {
        setIsLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor insira um endereço de email válido.");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            alert("Senha deve ter pelo menos 8 caracteres.");
            return;
        }

        if (password !== passwordConfirm) {
            alert("Senhas não conferem.");
            setIsLoading(false);
            return;
        }
        setIsLoading(false);

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: email.split("@")[0],
                });
                return await processUserCredentialAndRedirect(
                    userCredential,
                    setIsLoading
                );
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(`Erro ao cadastrar: ${errorCode} - ${errorMessage}`);
                setIsLoading(false);
                return;
            });
    };
    return {
        handleLogin,
        handleGoogleLogin,
        handleSignUp,
    };
}

async function processUserCredentialAndRedirect(
    userCredential: UserCredential,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
    const token = await userCredential.user.getIdToken();
    AsyncStorage.setItem("@app:session", token);
    setIsLoading(false);
    return userCredential;
}

export { handleLoginMethods };
