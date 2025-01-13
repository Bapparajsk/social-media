import axios from "axios";

const serverURL = process.env.URL || "http://127.0.0.1:8000";

const Server = axios.create({
    baseURL: serverURL,
    headers: {
        "Content-Type": "application/json",
    }
});

export default Server;