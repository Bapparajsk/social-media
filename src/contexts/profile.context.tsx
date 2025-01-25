"use client";

import { createContext, useState, useContext, ReactNode } from 'react';
import { Profile, ProfileContextProps } from "./type.profile";


const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profile, setProfile] = useState< Profile | null>(null);

    return (
        <ProfileContext value={{ profile, setProfile }}>
            {children}
        </ProfileContext>
    );
};

export const useProfile = (): ProfileContextProps => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};