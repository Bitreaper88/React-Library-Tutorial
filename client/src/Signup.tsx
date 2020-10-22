import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { withRouter, useHistory } from "react-router-dom";
import './App.css';

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

    // useEffect(() => {
    //     redirectTo();
    //   }, []);

    function closeModal() {
        setIsOpen(false);
    }

    function redirectTo() {
        history.push('/')
    }
      
    return (

        <div>
            <a className={"navBtn"} onClick={openModal}>Signup</a>
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
                    <form action="/api/signup">
                        <div className="row">
                            <label >Name:</label>
                            <input type="text" id="name" name="name" placeholder="Name"></input>
                        </div>

                        <div className="row">
                            <label >Email:</label>
                            <input type="text" id="email" name="email" placeholder="email"></input>
                        </div>

                        <div className="row">
                            <label >Password:</label>
                            <input type="text" id="password" name="password" placeholder="Password"></input>
                        </div>

                        <div className="row">
                            <input type="submit" onClick={redirectTo} value="Submit"></input>
                            {/* <button onClick={closeModal}>close</button>*/}
                        </div>

                    </form>
                </div>
            </Modal>
        </div>
    );
}

export default withRouter(SignupModal);