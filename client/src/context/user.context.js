import {createContext} from "react";

export const UserContext = createContext({
    user: null,
    openedCollection: null,
    setOpenedCollection: () => {}, 
    signIn: () =>{},
    logout: () =>{},
    isAuthenticated: false
})