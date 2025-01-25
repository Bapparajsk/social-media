import { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserContextProps } from "./type.user.context";


const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext value={{ user, setUser }}>
            {children}
        </UserContext>
    );
};

export const useUser = (): UserContextProps => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};