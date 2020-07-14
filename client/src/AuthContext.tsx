import {createContext, useContext} from "react";
import {API_URL} from "./constants";
import {IUser} from "./types";

interface IAuthContext {
    authenticated: boolean;
    login: (email: string, password: string) => Promise<Response>;
    logout: (token: string|null) => Promise<Response|void>;
    user: IUser | null;
    token: string | null;
}


const login = (email: string, password: string) => fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
});

const logout = (token: string|null) => {
    if (token) {
        return fetch(`${API_URL}/logout`, {
            method: "POST"
        });
    }

    return Promise.resolve();
    
};

const AuthContext = createContext<IAuthContext>({
    authenticated: false,
    login,
    logout,
    token: null,
    user: null
});

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
