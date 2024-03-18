import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
    const googleServicesFile = process.env.GOOGLE_SERVICES_FILE;

    return {
        ...config,
        slug: "ye-gestao-saude",
        name: "ye",
        android: {
            ...config.android,
            googleServicesFile,
        },
        updates: {
            url: "https://u.expo.dev/044f2ae9-84ba-4a17-b434-2b5c66f84a42",
        },
        runtimeVersion: {
            policy: "appVersion",
        },
    };
};
