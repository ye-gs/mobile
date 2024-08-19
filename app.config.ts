import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
    const googleServicesFile = process.env.GOOGLE_SERVICES_FILE;
    const firebaseApiKey = process.env.FIREBASE_API_KEY || "";
    const authDomain = process.env.FIREBASE_AUTH_DOMAIN || "";
    const projectId = process.env.FIREBASE_PROJECT_ID || "";
    const storageBucket = process.env.FIREBASE_STORAGE_BUCKET || "";
    const messagingSenderId = process.env.FIREBASE_MESSAGING_SENDER_ID || "";
    const appId = process.env.FIREBASE_APP_ID || "";
    const measurementId = process.env.FIREBASE_MEASUREMENT_ID || "";
    const webClientId = process.env.FIREBASE_WEB_CLIENT_ID || "";

    return {
        ...config,
        slug: "ye-gestao-saude",
        name: "ye",
        android: {
            ...config.android,
            googleServicesFile,
        },
        extra: {
            ...config.extra,
            firebaseApiKey,
            authDomain,
            projectId,
            storageBucket,
            messagingSenderId,
            appId,
            measurementId,
            webClientId,
        },
        ios: {
            ...config.ios,
            googleServicesFile,
            bundleIdentifier: "com.ye.gestao.saude",
        },
        updates: {
            url: "https://u.expo.dev/044f2ae9-84ba-4a17-b434-2b5c66f84a42",
        },
        runtimeVersion: {
            policy: "appVersion",
        },
    };
};
