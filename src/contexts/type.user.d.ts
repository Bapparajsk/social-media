export interface User {
    userId: string;
    name: string;
    title?: string | null;
    profilePicture: string | null;
    coverPicture: string | null;
    likedPosts: Map<string, string>,
    chatSystem: {
        chatRooms: Map<string, ChatRoom>;
        chatRoomHead: string | null;
    },
}

export interface ChatRoom {
    userId: string;
    messages: Message[];
    nextRoom: string | null;
    prevRoom: string | null;
}

export interface Message {
    message: string;
    sender: string;
    createdAt: Date;
}

export interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}