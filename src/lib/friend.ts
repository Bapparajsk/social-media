import Server from "@/lib/axios";

export const getFriendList = async (pageParam = 1, env: "friends" | "friend-requests" | "friendRequests" | "suggestions" = "friends") => {    
    const { data } = await Server.get(`/api/friend/${env}?page=${pageParam}`);   
    env = (env === "friend-requests") ? "friendRequests" : env;
    console.log(data[env]);
    
    return data[env];
};

export const sendFriendRequest = async (id?: string | undefined) => {
    if(!id) {
       throw new Error("Invalid user id");
    }

    const { data } = await Server.post(`/api/friend/send-request/${id}`);
    return data?.message || "Friend request sent";
};

export const acceptFriendRequest = async (id?: string | undefined) => {
    if(!id) {
        throw new Error("Invalid user id");
    }

    const { data } = await Server.post(`/api/friend/accept-request/${id}`);
    return data?.message || "Friend request accepted";
};