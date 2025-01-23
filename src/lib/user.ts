import Server from "./axios";

export const getUser = async (id?: string) => {
    id = id || '';
    const res = await Server.get(`/api/user/${id}`);
    return res.data;
};