export interface Profile {
    userId: string,
    name: string,
    title: string | null,
    profilePicture:  string | null,
    coverPicture: string | null,
    friends: Friend[],
    totalFriends: number,
    verifyEmail: boolean,
}

export interface Friend {
    userId: string;
    name: string;
    title: string | null;
    profilePicture: string | null;
    createdAt: Date;
}

export interface ProfileContextProps {
    profile: Profile | null;
    setProfile: (profile: Profile) => void;
}