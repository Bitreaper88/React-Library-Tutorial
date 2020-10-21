import React, { useRef, useState } from 'react';
import Modal from 'react-modal'
import { useAuthContext } from './AuthContext';
import './Login.css'

interface LoginProps {
    children: JSX.Element;
}

function Login(props: LoginProps) {
    const { login } = useAuthContext();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [message, setMessage] = useState(' ');

    const loginButton = useRef<HTMLButtonElement>(null);

    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    }

    Modal.setAppElement('#root');

    function hookedLink() {
        const finalLink = React.cloneElement(props.children, {
            onClick: () => { setShow(true) }
        });

        return finalLink;
    }

    async function handleLoginAttempt() {
        if (loginButton.current) {
            loginButton.current.setAttribute("disabled", "true");
        }

        try {
            const resp = await login(email, pwd);
            if (resp.ok) {
                setEmail('');
                setPwd('');
                setShow(false);
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
        <span>
            {hookedLink()}

            <Modal
                isOpen={show}
                onRequestClose={() => {
                    setEmail('');
                    setPwd('');
                    setShow(false);
                }}
                style={modalStyle}
            >
                <table className={'login-table'}>
                    <thead>
                        <tr>
                            <th>
                                <h2>Login</h2>
                            </th>
                        </tr>
                    </thead>
                    <tbody className={"login-body"}>
                        <tr>
                            <td className={"input-label"}>
                                Email:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    className={"input-box"}
                                    type="text"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={"input-label"}>
                                Password:
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    className={"input-box"}
                                    type="password"
                                    value={pwd}
                                    onChange={(event) => setPwd(event.target.value)} 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={"error-message"}>
                                {message}
                            </td>
                        </tr>
                        <tr>
                            <td className={"buttons"}>
                                <button
                                    className={"login-button"}
                                    ref={loginButton}
                                    onClick={handleLoginAttempt}
                                >Login</button>
                                <button
                                    className={"login-button"}
                                    onClick={() => {
                                        setMessage('');
                                        setShow(false)
                                    }}
                                >Close</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </span>
    )
}

export default Login;
