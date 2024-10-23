import { auth, db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useState, useContext, useEffect } from "react";
import Colors from "@/constants/Colors";
import { useTheme as _useTheme } from "react-native-paper";

export type Theme = keyof typeof Colors;
type ThemeContextType = {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

// Create a context for the theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider component for the theme context
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Theme>("light");
    const user = auth.currentUser;
    useEffect(() => {
        const fetchUserTheme = async () => {
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    console.log(userDoc.data()?.favoriteTheme);
                    setTheme(userDoc.data()?.favoriteTheme || theme);
                }
            }
        };

        fetchUserTheme().catch(console.error);
    }, []);
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Create a hook to use the theme context
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
