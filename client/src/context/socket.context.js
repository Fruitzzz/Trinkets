import { createContext } from "react";
import io from "socket.io-client";
const ENDPOINT = "https://itra-course-project.herokuapp.com"
const socket = io(ENDPOINT)

export const SocketContext = createContext(socket);