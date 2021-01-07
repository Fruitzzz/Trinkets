import {createContext} from "react";

const noop = () => {}
export const UserContext = createContext({
    user: null,
    signIn: noop,
    logout: noop,
    isAuthenticated: false
})