import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeFirestore } from "firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import Constants from "expo-constants";

GoogleSignin.configure({
    webClientId: Constants?.expoConfig?.extra?.webClientId || "",
});
// Firebase configuration
const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.firebaseApiKey || "",
    authDomain: Constants.expoConfig?.extra?.authDomain || "",
    projectId: Constants.expoConfig?.extra?.projectId || "",
    storageBucket: Constants.expoConfig?.extra?.storageBucket || "",
    messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId || "",
    appId: Constants.expoConfig?.extra?.appId || "",
    measurementId: Constants.expoConfig?.extra?.measurementId || "",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = initializeFirestore(app, {});
export { app, auth, db };
