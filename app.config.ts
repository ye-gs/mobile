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
    };
};
