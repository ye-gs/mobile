import { ExpoConfig, ConfigContext } from "expo/config";
import { config } from "dotenv";
config();

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
    const examFunctionUrl = process.env.EXPO_PUBLIC_EXAM_FUNCTION_URL;
    const webhookUrl = process.env.EXPO_PUBLIC_WEBHOOK_URL;
    const nodeEnv = process.env.NODE_ENV || "development";
    if (
        !firebaseApiKey ||
        !authDomain ||
        !projectId ||
        !storageBucket ||
        !messagingSenderId ||
        !appId ||
        !measurementId ||
        !webClientId
    ) {
        throw new Error("Missing firebase env variables");
    }
    if (!examFunctionUrl) {
        throw new Error("Missing exam function url");
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
            examFunctionUrl,
            nodeEnv,
            webhookUrl,
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
