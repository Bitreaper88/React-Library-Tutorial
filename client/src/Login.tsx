import React, {useRef, useState} from 'react';
import Modal from 'react-modal';
import {useHistory } from "react-router-dom";
import './App.css';
import {IApp} from "./App";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

function LoginModal(props: IApp) {
    const [modalIsOpen, setIsOpen] = useState(false);
    
    const {
        userIsAuthenticated,
        login,
        user,
        onLogoutClick,
        setToken} = props;


    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
    }

    function redirectTo() {
        history.push('/MyPage')
    }
      
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState(' ');

    const loginButton = useRef<HTMLInputElement>(null);

    
    async function handleLoginAttempt(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (loginButton.current) {
            loginButton.current.setAttribute("disabled", "true");
        }

        try {
            const resp = await login(email, pwd);
            if (resp.ok) {
                setEmail('');
                setPwd('');
                setIsOpen(false);
                const body = await resp.json();
                setToken(body.token);
                redirectTo();
                return;  
            }
            else {
                setMessage('Wrong Email or Password.');
            }
        }
        catch (err) {
            console.log()
            setMessage('Error logging in. Please try again later.')
        }

        if (loginButton.current) {
            loginButton.current.removeAttribute("disabled");
        }
    }

    return (
        <div>
            <a className={"navBtn"} onClick={openModal}>Login</a>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Login"
            >
                <div className="modal-container">
                    {/* <button onClick={closeModal}>close</button> */}
                    <h2> Login </h2>
                    <form onSubmit={(event) => handleLoginAttempt(event)}>

                        <div className="row">
                            <label >Email:</label>
                            <input type="text" id="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="email"></input>
                        </div>

                        <div className="row">
                            <label >Password:</label>
                            <input type="password" id="password" name="password" value={pwd} onChange={(event) => setPwd(event.target.value)} placeholder="Password"></input>
                        </div>
                        <p>{message}</p>
                 
                        <div className="row">
                                <input type="submit" value="Login" ref={loginButton}></input>
                         </div>
                     
                    </form>
                </div>
            </Modal>
        </div>
    );
}
export default LoginModal;