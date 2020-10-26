import React, { useState} from 'react';
import Modal from 'react-modal';
import { withRouter, useHistory } from "react-router-dom";
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

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
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
    const [message, setMessage] = useState(' ');

    async function handleSignupAttempt(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

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
                redirectTo();
            }
        } 
        catch (err) {
            setMessage('Error!');
        }
    }
      
    return (

        <div>
            <a id="signup" className={"navBtn"} onClick={openModal}>Signup</a>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Signup"
            >
                <div className="modal-container">
                    {/* <button onClick={closeModal}>close</button> */}
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
                            <input type="submit" value="Submit" ></input>
                        </div>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default withRouter(SignupModal);