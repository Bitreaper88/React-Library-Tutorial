import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { LoginFn } from './AuthContext';
import { IUser } from '../../server/src/types';

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
                hello!
            </Router>
        </div>
    ); 
};

export default App;
