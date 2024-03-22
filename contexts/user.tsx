// UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';

interface UserContextProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkUserDocument = async (user: User | null) => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDocSnap = await getDoc(userDocRef);
                if (!userDocSnap.exists()) {
                    await setDoc(userDocRef, { id: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL, createdAt: new Date(), updatedAt: new Date(), role: 'user', status: 'active', lastLogin: new Date(), lastLogout: new Date(), lastActivity: new Date(), lastPasswordChange: new Date(), lastEmailChange: new Date(), lastProfileUpdate: new Date(), emailVerified: user.emailVerified, phoneNumber: user.phoneNumber, providerId: user.providerId, isAnonymous: user.isAnonymous, tenantId: user.tenantId, });
                }
            }
        };

        checkUserDocument(user);
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};