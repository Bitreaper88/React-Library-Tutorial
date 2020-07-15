import React, {useState, useEffect, useMemo} from 'react';
import './App.css';
import AuthContext, {useAuthContext} from './AuthContext';
import {Login} from './Login';
import {API_URL} from './constants';
import {IUser} from "./types";
import Profile from './Profile';
import jwt from "jsonwebtoken";
import {setAccessToken, removeAccessToken, getAccessToken} from './utils';

const fetchProfile = async (id: string): Promise<IUser> => fetch(`${API_URL}/user/${id}`, {
    headers: {
        "Authorization": `Bearer ${getAccessToken()}`
    },
    credentials: "include"
})
    .then(response => response.status === 200 ? response.json() : null)
    .catch(err => console.log(err));

function App() {
    const {login, logout, refreshToken} = useAuthContext();
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState<string|null>(getAccessToken());
    const [user, setUser] = useState<IUser|null>(null);
    const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout|null>(null)

    const userId = useMemo(() => {
        if (token) {
            const { id } = jwt.decode(token, {
                json: true
            }) as {id: string};
            return id;
        }
        return null;
    }, [token])

    const clearState = () => {
        setToken(null);
        setAuthenticated(false);
        setRefreshInterval(null);
        setUser(null);
        removeAccessToken();
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
        console.log(token, refreshInterval)
        if (token && refreshInterval === null) {
            const interval = setInterval(() => refreshToken().then(token => {
                setAccessToken(token)
                setToken(token)
            })
                .catch(err => {
                    console.log(err)
                    clearState();
                }), 1000 * 60 * 10)
            setRefreshInterval(interval)
        }
    }, [refreshInterval, refreshToken, token]);

    useEffect(() => {
        refreshToken().then(token => {
            setAccessToken(token)
            setToken(token)
        }).catch(err => {
            console.log("Token not valid or expired. Login to get access.");
            clearState();
        })
    }, [refreshToken])

    useEffect(() => {
        if (refreshInterval !== null && token === null) {
            clearInterval(refreshInterval)
        }
    }, [refreshInterval, token])

    const onLogoutClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
            <div className="App">
                <header>
                    <h1>
                    Library application!
                    </h1>
                </header>
                <nav>
                </nav>
                <main>
                    {!authenticated ? 
                        <Login login={login} setToken={setToken}/> : 
                        <button onClick={onLogoutClick}>Logout</button>}
                    {authenticated && <Profile user={user} />}
                </main>
                <footer>
                </footer>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
