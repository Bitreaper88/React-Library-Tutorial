import {createContext, useContext} from "react";
import {API_URL} from "./constants";

interface IAuthContext {
    authenticated: boolean;
    login: (email: string, password: string) => Promise<Response>;
    logout: () => Promise<Response|void>;
}


const login = (email: string, password: string) => fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({email, password})
});

const logout = () => {
    const token = localStorage.getItem("token");
    if (token) {
        localStorage.removeItem("token");
        return fetch(`${API_URL}/logout`, {
            method: "POST"
        });
    }

    return Promise.resolve();
    
};

const AuthContext = createContext<IAuthContext>({
    authenticated: false,
    login,
    logout
});

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
