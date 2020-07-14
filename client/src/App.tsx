import React, {useState} from 'react';
import './App.css';
import AuthContext, {useAuthContext} from './AuthContext';
import {Login} from './Login';

function App() {
    const {login, logout} = useAuthContext();
    const [authenticated, setAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{
            authenticated,
            login,
            logout
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
                    <Login setAuthenticated={setAuthenticated} login={login} />
                    {authenticated && <span>You have logged in and are able to borrow books!</span>}
                </main>
                <footer>
                </footer>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
