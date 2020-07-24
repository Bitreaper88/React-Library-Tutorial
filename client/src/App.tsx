import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { LoginFn } from './AuthContext';
import { Signup } from './Signup';

interface IApp {
    userIsAuthenticated: boolean
    onLogoutClick: () => void,
    login: LoginFn,
    setToken: (value: string|null) => void
}

export type VisibleModal = "login" | "signup" | null;
export type RedirectToPage = "mypage" | "signupsuccessful" | null;

const App: React.FC<IApp> = (props) => {
    const { 
        userIsAuthenticated,
        login,
        onLogoutClick,
        setToken
    } = props;

    const [modalVisible, setModalVisible] = useState<VisibleModal>(null);
    const [redirectToPage, setRedirectToPage] = useState<RedirectToPage>(null);

    const setModal = (modalValue: VisibleModal) => 
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
            modalVisible === modalValue ?
                setModalVisible(null) :
                setModalVisible(modalValue);
        };

    return (
        <div>
            <Router>
                <div className="App">
                    <header>
                        <Link to="/"> Home </Link>
                        <Link to="/searchpage"> Search </Link>
                        {
                            userIsAuthenticated ?
                            <Link to="/mypage"> My page </Link> :
                            <a href="/#" onClick={setModal("signup")}> Signup </a>
                        }
                        {
                            userIsAuthenticated ?
                            <a href="/#" onClick={onLogoutClick}> Logout </a> :
                            <a href="/#" onClick={setModal("login")}> Login </a>
                        }
                    </header>
                    <nav>
                    </nav>
                    <main>
                        <Route exact path="/" render={()=>(
                            <div>
                                LIBRARBY
                            </div>
                        )}/>
                        <Route exact path="/mypage" render={()=>(
                            <div>
                                Hi Pasi, welcome to librarby
                            </div>
                        )}/>
                        <Route exact path="/signupsuccessful" render={()=>(
                            <div>
                                Signed up successfully!
                            </div>
                        )}/>
                        <Route exact path="/searchpage" render={()=>(
                            <div>
                                Search for books.......
                            </div>
                        )}/>
                    </main>
                    {
                        modalVisible === "login" &&
                        <Login
                            login={login}
                            setToken={setToken}
                            setModalVisible={setModalVisible}
                            setRedirectToPage={setRedirectToPage}
                        />
                    }
                    {
                        modalVisible === "signup"  &&
                        <Signup
                            setModalVisible={setModalVisible}
                            setRedirectToPage={setRedirectToPage}
                        />
                    }
                    <footer>
                    </footer>
                    {redirectToPage && <Redirect to={redirectToPage}/>}
                </div>
            </Router>
        </div>
    ); 
};

export default App;
