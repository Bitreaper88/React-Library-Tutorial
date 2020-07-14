import React, {useState, useEffect} from 'react';
import './App.css';
import AuthContext, {useAuthContext} from './AuthContext';
import {Login} from './Login';
import {API_URL} from './constants';
import {IUser} from "./types";
import Profile from './Profile';
import jwt from "jsonwebtoken";

const fetchProfile = async (id: string): Promise<IUser> => fetch(`${API_URL}/user/${id}`, {
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
})
    .then(response => response.status === 200 ? response.json() : null)
    .catch(err => console.log(err));

function App() {
    const {login, logout} = useAuthContext();
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState<string|null>(null);
    const [user, setUser] = useState<IUser|null>(null);

    useEffect(() => {
        if (token && token.length !== 0) {
            setAuthenticated(true);
        }
    }, [token])

    useEffect(() => {
        if (authenticated && token) {
            const { id } = jwt.decode(token, {
                json: true
            }) as {id: string};
            fetchProfile(id).then(setUser)
        }
    }, [authenticated, token])

    return (
        <AuthContext.Provider value={{
            authenticated,
            login,
            logout,
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
                    <Login login={login} setToken={setToken}/>
                    {authenticated && <Profile user={user} />}
                </main>
                <footer>
                </footer>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
