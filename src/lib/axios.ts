import axios from "axios";

const serverURL = process.env.URL || "http://192.168.0.173:8000";

const Server = axios.create({
    baseURL: serverURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

export default Server;