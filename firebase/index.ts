// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
const firebaseConfig = {
    apiKey: "AIzaSyDH8dYtjB9AZoj3hynOot0HSngGOn1wDuw",
    authDomain: "ye-gestao-saude.firebaseapp.com",
    projectId: "ye-gestao-saude",
    storageBucket: "ye-gestao-saude.appspot.com",
    messagingSenderId: "147160860966",
    appId: "1:147160860966:web:bf5cb02eb10da7b07999e7",
    measurementId: "G-ZPQDYNBGRM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export { app, auth, firebaseConfig };
