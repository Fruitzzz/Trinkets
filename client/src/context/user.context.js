import {createContext} from "react";

export const UserContext = createContext({
    user: null,
    signIn: () =>{},
    logout: () =>{},
    isAuthenticated: false
})