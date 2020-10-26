import React, { useRef, useState } from 'react';
import Modal from 'react-modal';
import { withRouter, useHistory, NavLink } from "react-router-dom";
import './App.css';
import { API_URL } from './constants';

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

function SignupModal() {

    let history = useHistory();
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function redirectTo() {
        setIsOpen(false);
        history.push('/Success')
    }
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState('');

    const signupButton = useRef<HTMLInputElement>(null);

    async function handleSignupAttempt(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name || !email || !pwd) {
            setMessage('Error! Please fill out the whole form.');
            return;
        }

        if (signupButton.current) {
            signupButton.current.setAttribute("disabled", "true");
        }


        try {
            const resp = await fetch(`${API_URL}/user`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: pwd
                })
            });
            if (resp.ok) {
                setName('');
                setEmail('');
                setPwd('');
                closeModal();
                redirectTo();
                return;
            }
        }
        catch (err) {
            setMessage('Error! Please try again later.');
        }

        if (signupButton.current) {
            signupButton.current.removeAttribute("disabled");
        }
    }

    return (

        <div>
            <NavLink to="#" id="signup" className={"navBtn"} onClick={openModal}>Signup</NavLink>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Signup"
            >
                <div className="modal-container">
                    <h2> Signup </h2>
                    <form onSubmit={(event) => handleSignupAttempt(event)}>
                        <div className="row">
                            <label >Name:</label>
                            <input type="text" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}></input>
                        </div>

                        <div className="row">
                            <label >Email:</label>
                            <input type="text" placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                        </div>

                        <div className="row">
                            <label >Password:</label>
                            <input type="password" placeholder="Password" value={pwd} onChange={(event) => setPwd(event.target.value)}></input>
                        </div>
                        <p>{message}</p>

                        <div className="row">
                            <input type="submit" ref={signupButton} value="Submit" ></input>
                        </div>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default withRouter(SignupModal);