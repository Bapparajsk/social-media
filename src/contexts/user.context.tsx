import { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserContextProps } from "./type.user";


const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const isAuth = () => {
        return user !== null;
    };

    return (
        <UserContext value={{ user, setUser, isAuth }}>
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