//const tintColorLight = "#407CE2";
//const tintColorDark = "#5563E2";

const Colors: { [key: string]: { [key: string]: string } } = {
    light: {
        text: "#000",
        subtext: "#7A7979",
        subtextSoft: "#8E98A1",
        background: "#fff",
        tint: "#344E41",
        tabIconDefault: "#ccc",
        tabIconSelected: "#344E41",
        url: "#407CE2",
        borderColor: "#344E41",
        circleBackground: "#A3B18A",
        altTextColor: "#556B2F",
        primaryLighter: "#A3B18A",
        primaryDarker: "#344E41",
        danger: "#bd3a31",
        black: "#242424",
        white: "#e0e0e0",
        themeColor: "#A3B18A",
    },
    dark: {
        text: "#e7e7e7",
        subtext: "#7A7979",
        subtextSoft: "#8E98A1",
        background: "#282828",
        tint: "#4551ba", // Kept as is
        tabIconDefault: "#ccc",
        tabIconSelected: "#5563E2", // Kept as is
        url: "#407CE2",
        borderColor: "#E5E7EB",
        circleBackground: "#92B0CC",
        altTextColor: "#5563E2", // Changed from green to "#5563E2"
        primaryLighter: "#5563E2", // Kept as is
        primaryDarker: "#5563E2", // Changed from green to "#5563E2"
        danger: "#a85751", // Kept as is
        black: "#242424",
        white: "#e0e0e0",
        themeColor: "#282828",
    },
    bluePill: {
        text: "#000", // Keep text color as is
        subtext: "#7A7979", // Keep as is, or update if needed
        subtextSoft: "#8E98A1", // Keep as is, or update if needed
        background: "#fff", // Keep background color as is
        tint: "#5563E2", // Assuming "#5563E2" is a blue shade
        tabIconDefault: "#ccc", // Keep tab icon default color as is
        tabIconSelected: "#5563E2", // Assuming "#5563E2" is a blue shade
        url: "#407CE2", // Keep URL color as is
        borderColor: "#E5E7EB", // Keep border color as is
        circleBackground: "#E6EEFF", // Keep circle background color as is
        altTextColor: "#0033FF", // Changed from green to a blue shade
        zapZap: "#DCF8C6", // Verde ZapZap NÂO MUDAR
        primaryLighter: "#E6EEFF", // Keep primary lighter color as is
        primaryDarker: "#002080", // Changed from dark green to a dark blue shade
        danger: "#bd3a31", // Keep danger color as is, or update if needed
        black: "#242424",
        white: "#e0e0e0",
        themeColor: "#5563E2", // Assuming "#5563E2" is a blue shade
    },
    drGray: {
        text: "#e7e7e7",
        subtext: "#7A7979",
        subtextSoft: "#8E98A1",
        background: "#404040",
        tint: "#5563E2", // Use "#5563E2"
        tabIconDefault: "#ccc",
        tabIconSelected: "#5563E2", // Use "#5563E2"
        url: "#407CE2",
        borderColor: "#E5E7EB",
        circleBackground: "#92B0CC",
        altTextColor: "#5563E2", // Replaced green with "#5563E2"
        primaryLighter: "#5563E2", // Use "#5563E2"
        primaryDarker: "#344E41", // Keep as is, or update if needed
        danger: "#a85751", // Keep danger color as is, or update if needed
        black: "#242424",
        white: "#e0e0e0",
        themeColor: "#404040", // Keep themeColor as is
    },
    rosaDesfibrilador: {
        text: "#000000", // Black text for contrast
        subtext: "#7A7979", // Gray subtext
        subtextSoft: "#8E98A1", // Light gray subtext
        background: "#FFE4E1", // Light pink background
        tint: "#FF69B4", // Hot pink
        tabIconDefault: "#ccc", // Default tab icon color
        tabIconSelected: "#ff5eaf", // Hot pink for selected tab icon
        url: "#FF1493", // Deep pink for URLs
        borderColor: "#FFC0CB", // Light pink border color
        circleBackground: "#FFB6C1", // Light pink circle background
        altTextColor: "#FF69B4", // Hot pink for alternative text
        primaryLighter: "#FFB6C1", // Light pink for primary lighter
        primaryDarker: "#FF1493", // Deep pink for primary darker
        danger: "#FF6347", // Tomato red for danger
        black: "#242424", // Black
        white: "#e0e0e0", // White
        themeColor: "#FFE4E1", // Light pink for theme color
    },
    pediGree: {
        text: "#32CD32", // Cinza teste
        subtext: "#7A7979", // Gray subtext
        subtextSoft: "#8E98A1", // Light gray subtext
        background: "#F0F8F0", // Light green background
        tint: "#32CD32", // Lime green
        tabIconDefault: "#ccc", // Default tab icon color
        tabIconSelected: "#6AA84F", // Lime green for selected tab icon
        url: "#8E7CC3", // Forest green for URLs
        borderColor: "#90EE90", // Light green border color
        circleBackground: "#98FB98", // Pale green circle background
        altTextColor: "#32CD32", // Lime green for alternative text
        primaryLighter: "#EEFEEE", // Pale green for primary lighter
        primaryDarker: "#3AA450", // Dark green for primary darker
        danger: "#FF7C4C", // Orange red for danger
        black: "#242424", // Black
        white: "#e0e0e0", // White
        themeColor: "#F0F8F0", // Cor do Botão de temas
    },
    darkPurple: {
        text: "#bfbfbf", // Light gray text for contrast
        subtext: "#9B9B9B", // Medium gray subtext
        subtextSoft: "#d1d1d1", // Light gray subtext
        background: "#2E003E", // Dark purple background
        tint: "#4c0161", // Dark violet
        tabIconDefault: "#ccc", // Default tab icon color
        tabIconSelected: "#ab23ba", // Dark violet for selected tab icon
        url: "#D02BE2", // Blue violet for URLs
        borderColor: "#4c1073", // Dark purple border color
        circleBackground: "#6A0D91", // Dark violet circle background
        altTextColor: "#d0bce8", // Dark violet for alternative text
        primaryLighter: "#8A2BE2", // Blue violet for primary lighter
        primaryDarker: "#3D0C5D", // Dark purple for primary darker
        danger: "#B22222", // Firebrick red for danger
        black: "#242424", // Black
        white: "#e0e0e0", // White
        themeColor: "#2E003E", // Dark purple for theme color
    },
    redPill: {
        text: "#e0e0e0", // Light gray text for contrast
        subtext: "#9B9B9B", // Medium gray subtext
        subtextSoft: "#BEBEBE", // Light gray subtext
        background: "#cf2d2d", // Dark purple background
        tint: "#6e0505", // Dark violet
        tabIconDefault: "#630101", // Default tab icon color
        tabIconSelected: "#e22b65", // Dark violet for selected tab icon
        url: "#e22b65", // Blue violet for URLs
        borderColor: "#5d0c27", // Dark purple border color
        circleBackground: "#910d16", // Dark violet circle background
        altTextColor: "#910d16", // Dark violet for alternative text
        primaryLighter: "#e65757", // Blue violet for primary lighter
        primaryDarker: "#5d0c15", // Dark purple for primary darker
        danger: "#B22222", // Firebrick red for danger
        black: "#242424", // Black
        white: "#e0e0e0", // White
        themeColor: "#cf2d2d", // Dark purple for theme color
    }
};
export const otherColors = {
    shadowColor1: "#000",
    black1: 'black',
    white1: 'white',
    primary: "#333",
    secondary: "#fff",
    background: "#f5f5f5",
    cardBackground: "#fff",
    cardBorder: "#ddd",
    buttonBackground: "#007BFF",
    buttonText: "#FFF",
}

export default Colors;
