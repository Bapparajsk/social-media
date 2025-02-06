import Server from "@/lib/axios";

export const getFriendList = async (pageParam = 1, env: "friends" | "friend-requests" | "friendRequests" | "suggestions" = "friends") => {    
    const { data } = await Server.get(`/api/friend/${env}?page=${pageParam}`);   
    env = (env === "friend-requests") ? "friendRequests" : env;
    console.log(data);
    
    return data[env];
};

export const friendMutation = async ({ id, key }: {id: string, key: "send-request" | "accept-request" | "reject-request" | "remove-friend"}) => {
    const { data } = await Server.post(`/api/friend/${key}/${id}`);
    return data?.message || "Success";
};