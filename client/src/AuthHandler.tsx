import React, {useState, useEffect, useMemo} from 'react';
import './App.css';
import AuthContext, {useAuthContext} from './AuthContext';
import {API_URL} from './constants';
import {IUser} from "../../server/src/types";
import jwt from "jsonwebtoken";
import {saveAccessTokenToLocalStorage, removeAccessTokenFromLocalStorage, loadAccessTokenFromLocalStorage} from './utils';
import App from "./App";

const fetchProfile = async (id: string): Promise<IUser> => fetch(`${API_URL}/user/${id}`, {
    headers: {
        "Authorization": `Bearer ${loadAccessTokenFromLocalStorage()}`
    },
    credentials: "include"
})
    .then(response => response.status === 200 ? response.json() : null)
    .catch(err => console.log(err));

const AuthHandler = () => {
    const {login, logout, refreshToken} = useAuthContext();
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState<string|null>(loadAccessTokenFromLocalStorage());
    const [user, setUser] = useState<IUser|null>(null);
    const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout|null>(null)

    const userId = useMemo(() => {
        if (token) {
            const { id } = jwt.decode(token, {json: true}) as {id: string};
            return id;
        }
        return null;
    }, [token])

    const clearState = () => {
        setToken(null);
        setAuthenticated(false);
        setRefreshInterval(null);
        setUser(null);
        removeAccessTokenFromLocalStorage();
    }
    
    useEffect(() => {
        if (token && token.length !== 0) {
            setAuthenticated(true);
        }
    }, [token])


    useEffect(() => {
        if (userId)
            fetchProfile(userId)
                .then(setUser)
                .catch(err => console.log(err))
    }, [userId])


    useEffect(() => {
        //refreshes access token every ten minutes
        const tenMinutesInMilliseconds = 1000 * 60 * 10;
        //console.log(token, refreshInterval);
        if (token && refreshInterval === null) {
            const interval = setInterval(() => refreshToken()
                .then(token => {
                    saveAccessTokenToLocalStorage(token);
                    setToken(token);
                })
                .catch(err => {
                    console.log(err);
                    clearState();
                }), tenMinutesInMilliseconds)
            setRefreshInterval(interval)
        }
    }, [refreshInterval, refreshToken, token]);

    useEffect(() => {
        refreshToken().then(token => {
            saveAccessTokenToLocalStorage(token);
            setToken(token);
        }).catch(err => {
            console.log("Token is not valid or it has expired. Login to get access.", err);
            clearState();
        })
    }, [refreshToken])

    useEffect(() => {
        if (refreshInterval !== null && token === null) {
            clearInterval(refreshInterval);
        }
    }, [refreshInterval, token])

    const onLogoutClick = () => {
        logout(token, refreshInterval)
            .then(() => {
                clearState();
            })
            .catch(err => console.log(err));
    }

    return (
        <AuthContext.Provider value={{
            authenticated,
            login,
            logout,
            refreshToken,
            token,
            user
        }}>
            <App 
                userIsAuthenticated={authenticated} 
                login={login}
                user={user}
                onLogoutClick={onLogoutClick}
                setToken={setToken}
            />
        </AuthContext.Provider>
    );
}

export default AuthHandler;
