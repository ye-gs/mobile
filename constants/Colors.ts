const tintColorLight = "#407CE2";
const tintColorDark = "#5563E2";

export default {
    light: {
        text: "#000",
        subtext: "#7A7979",
        subtextSoft: "#8E98A1",
        background: "#fff",
        tint: "#344E41",
        tabIconDefault: "#ccc",
        tabIconSelected: "#344E41",
        url: "#407CE2",
        borderColor: "#E5E7EB",
        circleBackground: "#A3B18A",
        altTextColor: "#556B2F",
        primaryLighter: "#A3B18A",
        primaryDarker: "#344E41",
        danger: "#bd3a31",
        black: "#000",
        white: "#fff",
        themeColor: "#A3B18A",
    },
    dark: {
        text: "#e7e7e7",
        subtext: "#7A7979",
        subtextSoft: "#8E98A1",
        background: "#282828",
        tint: tintColorDark, // Kept as is
        tabIconDefault: "#ccc",
        tabIconSelected: tintColorDark, // Kept as is
        url: "#407CE2",
        borderColor: "#E5E7EB",
        circleBackground: "#92B0CC",
        altTextColor: tintColorDark, // Changed from green to tintColorDark
        primaryLighter: tintColorDark, // Kept as is
        primaryDarker: tintColorDark, // Changed from green to tintColorDark
        danger: "#a85751", // Kept as is
        black: "#000",
        white: "#fff",
        themeColor: "#282828",
    },

    blueLight: {
        text: "#000", // Keep text color as is
        subtext: "#7A7979", // Keep as is, or update if needed
        subtextSoft: "#8E98A1", // Keep as is, or update if needed
        background: "#fff", // Keep background color as is
        tint: tintColorDark, // Assuming tintColorDark is a blue shade
        tabIconDefault: "#ccc", // Keep tab icon default color as is
        tabIconSelected: tintColorDark, // Assuming tintColorDark is a blue shade
        url: "#407CE2", // Keep URL color as is
        borderColor: "#E5E7EB", // Keep border color as is
        circleBackground: "#E6EEFF", // Keep circle background color as is
        altTextColor: "#0033FF", // Changed from green to a blue shade
        primaryLighter: tintColorDark, // Assuming tintColorDark is a blue shade
        primaryDarker: "#002080", // Changed from dark green to a dark blue shade
        danger: "#bd3a31", // Keep danger color as is, or update if needed
        themeColor: tintColorDark, // Assuming tintColorDark is a blue shade
    },

    gray: {
        text: "#e7e7e7",
        subtext: "#7A7979",
        subtextSoft: "#8E98A1",
        background: "#404040",
        tint: tintColorDark, // Use tintColorDark
        tabIconDefault: "#ccc",
        tabIconSelected: tintColorDark, // Use tintColorDark
        url: "#407CE2",
        borderColor: "#E5E7EB",
        circleBackground: "#92B0CC",
        altTextColor: tintColorDark, // Replaced green with tintColorDark
        primaryLighter: tintColorDark, // Use tintColorDark
        primaryDarker: "#344E41", // Keep as is, or update if needed
        danger: "#a85751", // Keep danger color as is, or update if needed
        black: "#000",
        white: "#fff",
        themeColor: "#404040", // Keep themeColor as is
    },
    lightPink: {
        text: "#000000", // Black text for contrast
        subtext: "#7A7979", // Gray subtext
        subtextSoft: "#8E98A1", // Light gray subtext
        background: "#FFE4E1", // Light pink background
        tint: "#FF69B4", // Hot pink
        tabIconDefault: "#ccc", // Default tab icon color
        tabIconSelected: "#FF69B4", // Hot pink for selected tab icon
        url: "#FF1493", // Deep pink for URLs
        borderColor: "#FFC0CB", // Light pink border color
        circleBackground: "#FFB6C1", // Light pink circle background
        altTextColor: "#FF69B4", // Hot pink for alternative text
        primaryLighter: "#FFB6C1", // Light pink for primary lighter
        primaryDarker: "#FF1493", // Deep pink for primary darker
        danger: "#FF6347", // Tomato red for danger
        black: "#000000", // Black
        white: "#FFFFFF", // White
        themeColor: "#FFE4E1", // Light pink for theme color
    },
    limeGreen: {
        text: "#000000", // Black text for contrast
        subtext: "#7A7979", // Gray subtext
        subtextSoft: "#8E98A1", // Light gray subtext
        background: "#F0F8F0", // Light green background
        tint: "#32CD32", // Lime green
        tabIconDefault: "#ccc", // Default tab icon color
        tabIconSelected: "#32CD32", // Lime green for selected tab icon
        url: "#228B22", // Forest green for URLs
        borderColor: "#90EE90", // Light green border color
        circleBackground: "#98FB98", // Pale green circle background
        altTextColor: "#32CD32", // Lime green for alternative text
        primaryLighter: "#98FB98", // Pale green for primary lighter
        primaryDarker: "#228B22", // Dark green for primary darker
        danger: "#FF4500", // Orange red for danger
        black: "#000000", // Black
        white: "#FFFFFF", // White
        themeColor: "#F0F8F0", // Light green for theme color
    },
    darkPurple: {
        text: "#EAEAEA", // Light gray text for contrast
        subtext: "#9B9B9B", // Medium gray subtext
        subtextSoft: "#BEBEBE", // Light gray subtext
        background: "#2E003E", // Dark purple background
        tint: "#6A0D91", // Dark violet
        tabIconDefault: "#ccc", // Default tab icon color
        tabIconSelected: "#6A0D91", // Dark violet for selected tab icon
        url: "#8A2BE2", // Blue violet for URLs
        borderColor: "#3D0C5D", // Dark purple border color
        circleBackground: "#6A0D91", // Dark violet circle background
        altTextColor: "#6A0D91", // Dark violet for alternative text
        primaryLighter: "#8A2BE2", // Blue violet for primary lighter
        primaryDarker: "#3D0C5D", // Dark purple for primary darker
        danger: "#B22222", // Firebrick red for danger
        black: "#000000", // Black
        white: "#FFFFFF", // White
        themeColor: "#2E003E", // Dark purple for theme color
    },
};
import Colors from "./Colors";

export const ThemeNames = Object.keys(Colors);
