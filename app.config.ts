import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
    const googleServicesFile = process.env.GOOGLE_SERVICES_FILE;
    const firebaseApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
    const authDomain = process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN;
    const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID;
    const storageBucket = process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET;
    const messagingSenderId =
        process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
    const appId = process.env.EXPO_PUBLIC_FIREBASE_APP_ID;
    const measurementId = process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID;
    const webClientId = process.env.EXPO_PUBLIC_FIREBASE_WEB_CLIENT_ID;
    if (!googleServicesFile) {
        throw new Error("GOOGLE_SERVICES_FILE must be defined");
    }
    if (!firebaseApiKey) {
        throw new Error("FIREBASE_API_KEY must be defined");
    }
    if (!authDomain) {
        throw new Error("FIREBASE_AUTH_DOMAIN must be defined");
    }
    if (!projectId) {
        throw new Error("FIREBASE_PROJECT_ID must be defined");
    }
    if (!storageBucket) {
        throw new Error("FIREBASE_STORAGE_BUCKET must be defined");
    }
    if (!messagingSenderId) {
        throw new Error("FIREBASE_MESSAGING_SENDER_ID must be defined");
    }
    if (!appId) {
        throw new Error("FIREBASE_APP_ID must be defined");
    }
    if (!measurementId) {
        throw new Error("FIREBASE_MEASUREMENT_ID must be defined");
    }
    if (!webClientId) {
        throw new Error("FIREBASE_WEB_CLIENT_ID must be defined");
    }

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
