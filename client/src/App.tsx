import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Login } from './Login';
import { LoginFn } from './AuthContext';

interface IApp {
    userIsAuthenticated: boolean
    onLogoutClick: () => void,
    login: LoginFn,
    setToken: (value: string|null) => void
}

const App: React.FC<IApp> = (props) => {
    const { 
        userIsAuthenticated,
        login,
        onLogoutClick,
        setToken
    } = props;

    return (
        <div>
            <Router>
                <div className="App">
                    <header>
                        <h1>
                        Library
                        </h1>
                        <br/>
                        <Link to="/search"> Search </Link>
                        <Link to="/signup"> Sign up </Link>
                        {
                            userIsAuthenticated ?
                            <a onClick={onLogoutClick}>Logout</a> :
                            <Link to="/login"> Login </Link>
                        }
                    </header>
                    <nav>
                    </nav>
                    <main>
                        jeaap
                    </main>
                    {
                        !userIsAuthenticated &&
                        <Login login={login} setToken={setToken}/>
                    }
                    <footer>
                    </footer>
                </div>
            </Router>
        </div>
    ); 
};

export default App;
