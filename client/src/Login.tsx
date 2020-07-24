import React, {useState, ChangeEvent} from "react";
import Modal from "react-modal";
import "./Login.css";
import {saveAccessTokenToLocalStorage} from "./utils";
import { VisibleModal, RedirectToPage } from "./App";

interface ILoginProps {
    login: (email: string, password: string) => Promise<Response>;
    setToken: (token: string | null) => void;
    setVisibleModal: (val: VisibleModal) => void;
    visible: boolean;
    setRedirectToPage: (val: RedirectToPage) => void;
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')
  

export const Login: React.FC<ILoginProps> = props => {
    const {
        login,
        setToken,
        setVisibleModal,
        visible,
        setRedirectToPage
    } = props;
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    
    const onLoginClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return login(formData.email, formData.password)
            .then(response => {
                console.log(response)
                if (response.status === 200) { //successful login!
                    setVisibleModal(null);
                    setRedirectToPage("mypage");
                    return response.json();
                }
                return null;
            })
            .then(data => {
                console.log(data)
                if (data && data.token) {
                    saveAccessTokenToLocalStorage(data.token);
                    setToken(data.token);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, email: event.target.value})
    }

    const onPasswordChange= (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, password: event.target.value})
    }

    return (
        <Modal
            isOpen={visible}
            className="LoginSignupModal"
            onRequestClose={()=>setVisibleModal(null)}
            contentLabel="Login Modal"
        >
            <div className="Login">
                <h2>Login</h2>
                <form onSubmit={onLoginClick}>
                    <div>
                        <label>Email:</label>
                        <input type="text" id="email" name="email" onChange={onEmailChange} />
                    </div>  
                    <div>
                        <label>Password:</label>
                        <input type="password" id="password" name="password" onChange={onPasswordChange} />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </Modal>
    )
}
