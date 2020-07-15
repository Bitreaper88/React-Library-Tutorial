import {createContext, useContext} from "react";
import {API_URL} from "./constants";
import {IUser} from "./types";

interface IAuthContext {
    authenticated: boolean;
    login: (email: string, password: string) => Promise<Response>;
    logout: (token: string|null, refreshInterval?: NodeJS.Timeout | null) => Promise<Response|void>;
    refreshToken: () => Promise<string>
    user: IUser | null;
    token: string | null;
}


const login = (email: string, password: string) => fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({email, password})
});

const logout = (token: string|null, refreshInterval?: NodeJS.Timeout|null) => {
    if (refreshInterval) {
        clearInterval(refreshInterval)
    }
    if (token) {
        return fetch(`${API_URL}/logout`, {
            method: "POST",
            credentials: "include"
        });
    }

    return Promise.resolve();
    
};

const refreshToken = (): Promise<string> =>
    fetch(`${API_URL}/refreshToken`, {
        method: "GET",
        credentials: "include"
    }).then(response => {
        if (response.status === 200) {
            return response.json()
        }
        throw new Error("Couldn't refresh token");
    });

const AuthContext = createContext<IAuthContext>({
    authenticated: false,
    login,
    logout,
    refreshToken,
    token: null,
    user: null
});

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
