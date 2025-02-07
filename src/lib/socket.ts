import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initializeSocket = (): Socket => {
    if (!socket) {
        socket = io("http://127.0.0.1:8000");
    }
    return socket;
};

export const getSocket = (): Socket => {
    if (!socket) {
        return initializeSocket();
    }
    return socket;
};