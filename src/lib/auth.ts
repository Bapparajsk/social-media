import { isAxiosError } from "axios";
import { UseFormClearErrors, UseFormSetError } from "react-hook-form";
import Server from "./axios";
import { Inputs } from "@/components/auth/FormLayout";


export const login = async (email: string, password: string) => {
    const res = await Server.post("/api/auth/login", { email, password });
    console.log(res.data);

    return res.data;
};

export const verifyLoginOtp = async (otp: string, tempToken: string) => {
    console.log(otp, tempToken);
    
    const res = await Server.post("/api/auth/otp/login-with", { otp, tempToken });
    return res.data;
};

export const verifyRegisterOtp = async (otp: string) => {
    const res = await Server.post("/api/auth/otp/verify", { otp });
    return res.data;
};

export const registerServer = async (name: string, email: string, password: string) => {
    const res = await Server.post("/api/auth/register", { name, email, password });
    return res.data;
};

interface LoginErrorHandlers {
    clearErrors: UseFormClearErrors<Inputs>;
    setError: UseFormSetError<Inputs>;
    setIsMainError: React.Dispatch<React.SetStateAction<string | null>>;
}

export const loginErrorSet = (
    error: Error, 
    { clearErrors, setIsMainError, setError }: LoginErrorHandlers
) => {
    clearErrors();
    setIsMainError(null);
    if (!isAxiosError(error)) {
        setIsMainError("An error occurred, please try again later.");
        return;
    }

    const { response } = error;

    if (response?.status === 404) {
        setError("email", { message: "Email not found" });
        return;
    }

    if (response?.status === 400) {
        setIsMainError("Invalid credentials");
        setError("email", { message: "Email is incorrect" });
        setError("password", { message: "Password is incorrect" });
        return;
    }

    if (response?.status === 401) {
        setError("email", { message: "Invalid email or password" });
        setError("password", { message: "Invalid email or password" });
        return;
    }

    if (response?.status === 500) {
        setIsMainError("An error occurred, please try again later.");
        return;
    }

    setIsMainError(error.message || "An error occurred, please try again later.");
};

export const registerErrorSet = (
    error: Error, 
    { clearErrors, setIsMainError, setError }: LoginErrorHandlers
) => {
    clearErrors();
    setIsMainError(null);
    if (!isAxiosError(error)) {
        setIsMainError("An error occurred, please try again later.");
        return;
    }

    const { response } = error;

    if (response?.status === 400) {
        setIsMainError(response.data.message || "An error occurred, please try again later.");
        setError("email", { message: response.data.message || "An error occurred, please try again later." });
        return;
    }

    if (response?.status === 500) {
        setIsMainError("An error occurred, please try again later.");
        return;
    }

    setIsMainError(error.message || "An error occurred, please try again later.");
};