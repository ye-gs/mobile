import { auth } from "@/firebase";
import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import { router } from "expo-router";
import {
    GoogleAuthProvider,
    User,
    createUserWithEmailAndPassword,
    signInWithCredential,
    signInWithEmailAndPassword,
} from "firebase/auth";

function handleLoginMethods(
    email: string,
    password: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setUser: React.Dispatch<React.SetStateAction<User | null>>,
    passwordConfirm?: string,
    username?: string,
    gender?: string | null
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
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                router.navigate("/home");
                setIsLoading(false);
                return user;
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
            const user = await signInWithCredential(auth, googleCredential);
            setUser(user.user);
            router.navigate("/home");
            setIsLoading(false);
            return user;
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
        console.log(email);
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

        router.navigate("/home");
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                setUser(user);
                router.navigate("/home");
                setIsLoading(false);
                return user;
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
export { handleLoginMethods };
