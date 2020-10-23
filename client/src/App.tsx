import React, { useState } from 'react';
import { BrowserRouter as Router, NavLink, Link, Route, Redirect } from 'react-router-dom';
import { LoginFn } from './AuthContext';
import { IUser } from '../../server/src/types';
import './App.css';

import Home from './Home';
import SignupModal from './Signup';
import LoginModal from './Login';
import MyPage from './MyPage';
import Success from './Success';

export interface IApp {
    userIsAuthenticated: boolean
    onLogoutClick: () => void,
    login: LoginFn,
    user: IUser | null,
    setToken: (value: string | null) => void
}

const App: React.FC<IApp> = (props) => {
    const {
        userIsAuthenticated,
        login,
        user,
        onLogoutClick,
        setToken
    } = props;

    return (
        <div>
            <Router>
                <div>
                    <ul className="App-header">
                        {/* {user && <li className="headerText">{user} </li>}       */}
            
                        <li>
                            <NavLink to="/" exact className={"navBtn"} activeClassName={"activeLink"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Search" exact className={"navBtn"} activeClassName={"activeLink"}>Search</NavLink>
                        </li>
                        <li>
                            {!userIsAuthenticated &&  <SignupModal /> }      
                        </li>
                        <li> 
                             {!userIsAuthenticated ? <LoginModal {...props} /> :
                               <NavLink to="/" exact className={"navBtn"} onClick={onLogoutClick}>Logout</NavLink> }      
                        </li>
                        <li> 
                             {userIsAuthenticated &&
                             <NavLink to="/MyPage" exact className={"navBtn"} activeClassName={"activeLink"}>MyPage</NavLink> }      
                        </li>

                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/MyPage" ><MyPage {...props}/></Route>
                    <Route path="/Success" component={Success} />
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