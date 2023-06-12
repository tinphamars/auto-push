import {io} from "socket.io-client";

const url: string = "http://localhost:8080";
export const socket = io(url);
