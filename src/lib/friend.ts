import Server from "@/lib/axios";

export const getFriendList = async (pageParam = 1, env: "friends" | "friend-requests" | "suggestions" = "friends") => {
    console.log("fetching", env);
    
    const { data } = await Server.get(`/api/friend/${env}?page=${pageParam}`);    
    return data[env];
};