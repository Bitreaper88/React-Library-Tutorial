import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, NavLink, Link, Route, Redirect } from 'react-router-dom';
import { LoginFn } from './AuthContext';
import { IUser } from '../../server/src/types';

import Home from './Home';
// import Search from './Search';
// import Signup from './Signup';
// import Login from './Login';


interface IApp {
    userIsAuthenticated: boolean
    onLogoutClick: () => void,
    login: LoginFn,
    user: IUser | null,
    setToken: (value: string | null) => void
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
                <div>
                    <ul className="App-header">
                        {/* <li className="headerText"> Basic navigation </li> */}
                        <li>
                            <NavLink to="/" exact className={"navBtn"} activeClassName={"activeLink"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Search" exact className={"navBtn"} activeClassName={"activeLink"}>Search</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Signup" exact className={"navBtn"} activeClassName={"activeLink"}>Signup</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Login" exact className={"navBtn"} activeClassName={"activeLink"}>Login</NavLink>
                        </li>
                    </ul>
                    <Route exact path="/" component={Home} />
                    <div className="footer">
                        Library Web App group orange 2020
                    </div>
                    {/* 
                        <Route path="/Search" component={Search} />
                        <Route path="/Signup" component={Signup} />
                        <Route path="/Login" component={Login} /> */}
                </div>
            </Router>
        </div>
    );
};

export default App;
