import Server from "./axios";

export const getUser = async () => {
    // id = id || '';
    const res = await Server.get(`/api/user/`);    
    return res.data.user;
};