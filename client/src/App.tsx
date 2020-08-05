import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { Login } from './Login';
import { LoginFn } from './AuthContext';
import { Signup } from './Signup';
import { IUser } from '../../server/src/types';
import { Search } from "./Search";
import { MyPage } from "./MyPage";

interface IApp {
    userIsAuthenticated: boolean
    onLogoutClick: () => void,
    login: LoginFn,
    user: IUser | null,
    setToken: (value: string|null) => void
}

export type VisibleModal = "login" | "signup" | null;
export type RedirectToPage = "mypage" | "signupsuccessful" | null;

const App: React.FC<IApp> = (props) => {
    const { 
        userIsAuthenticated,
        login,
        user,
        onLogoutClick,
        setToken
    } = props;

    const [visibleModal, setVisibleModal] = useState<VisibleModal>(null);
    const [redirectToPage, setRedirectToPage] = useState<RedirectToPage>(null);

    const setModal = (modalValue: VisibleModal) => 
        (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            event.preventDefault();
            visibleModal === modalValue ?
                setVisibleModal(null) :
                setVisibleModal(modalValue);
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
                        <Route exact path="/mypage" render={()=><MyPage user={user}/>}/>
                        <Route exact path="/signupsuccessful" render={()=>(
                            <div>
                                Signed up successfully!
                            </div>
                        )}/>
                        <Route exact path="/searchpage" render={()=><Search/>}/>
                    </main>
                    <Login
                        login={login}
                        setToken={setToken}
                        visible={visibleModal === "login" ? true : false}
                        setVisibleModal={setVisibleModal}
                        setRedirectToPage={setRedirectToPage}
                    />
                    <Signup
                        visible={visibleModal === "signup" ? true : false}
                        setVisibleModal={setVisibleModal}
                        setRedirectToPage={setRedirectToPage}
                    />
                    <footer>
                    </footer>
                    {redirectToPage && <Redirect to={redirectToPage}/>}
                </div>
            </Router>
        </div>
    ); 
};

export default App;
