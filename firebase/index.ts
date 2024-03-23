import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeFirestore } from "firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "147160860966-am6ip3ii0mro78t0rld4rrp3gmufrcqa.apps.googleusercontent.com",
});
// Firebase configuration
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
const db = initializeFirestore(app, {});
export { app, auth, db };
