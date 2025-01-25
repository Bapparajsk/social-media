import Server from "./axios";

export const login = async (email: string, password: string) => {
    const res = await Server.post("/api/auth/login", {email, password});
    console.log(res.data);
    
    return res.data;
};

export const verifyLoginOtp = async (otp: string, tempToken: string) => {
    const res = await Server.post("/api/auth/otp/login-with'", {otp, tempToken});
    return res.data;
};