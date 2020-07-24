import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
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

    const [LoginUIVisible, setLoginUIVisible] = useState<boolean>(false);
    const [redirectToMyPage, setRedirectToMyPage] = useState<boolean>(false);
    return (
        <div>
            <Router>
                <div className="App">
                    <header>
                        <Link to="/searchpage"> Search </Link>
                        {
                            userIsAuthenticated ?
                            <Link to="/mypage"> My page </Link> :
                            <Link to="/signup"> Sign up </Link>
                        }
                        {
                            userIsAuthenticated ?
                            <a href="/#" onClick={onLogoutClick}> Logout </a> :
                            <a href="/#" onClick={() => setLoginUIVisible(!LoginUIVisible)}> Login </a>
                        }
                    </header>
                    <nav>
                    </nav>
                    <main>
                        <Route exact path="/mypage" render={()=>(
                            <div>
                                mypage
                            </div>
                        )}/>
                        <Route exact path="/searchpage" render={()=>(
                            <div>
                                srch
                            </div>
                        )}/>
                    </main>
                    {
                        LoginUIVisible &&
                        <Login
                            login={login}
                            setToken={setToken}
                            setLoginUIVisible={setLoginUIVisible}
                            setRedirectToMyPage={setRedirectToMyPage}
                        />
                    }
                    <footer>
                    </footer>
                    {redirectToMyPage && <Redirect to='/mypage' />}
                </div>
            </Router>
        </div>
    ); 
};

export default App;
