import React from 'react';
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom';
import { LoginFn } from './AuthContext';
import { IUser } from '../../server/src/types';
import './App.css';

import Home from './Home';
import Search from './Search';
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

                        <li>
                            <NavLink to="/" exact className={"navBtn"} activeClassName={"activeLink"}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Search" exact className={"navBtn"} activeClassName={"activeLink"}>Search</NavLink>
                        </li>
                        <li>
                            {userIsAuthenticated &&
                                <NavLink to="/MyPage" exact className={"navBtn"} activeClassName={"activeLink"}>MyPage</NavLink>}
                        </li>

                        <div className="topnav-right rightBtn">
                            <ul className="App-header">
                                <li>
                                    {!userIsAuthenticated &&  <SignupModal /> }      
                                </li>
                                <li> 
                                    {!userIsAuthenticated ? <LoginModal login={login} setToken={setToken} /> :
                                    <NavLink to="/" exact className={"navBtn"} onClick={onLogoutClick}>Logout</NavLink> }      
                                </li>
                            </ul>
                        </div>
                     
                    </ul>
                    <Route exact path="/" component={Home} />
                    <Route path="/MyPage" ><MyPage user={user} /></Route>
                    <Route path="/Success" component={Success} />
                    <div className="footer">
                        Library Web App group orange 2020
                    </div>
                    <Route path="/Search" component={Search} />
                </div>
            </Router>
        </div>
    );
};

export default App;