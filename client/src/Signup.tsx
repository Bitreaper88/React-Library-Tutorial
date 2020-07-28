import React, {useState, ChangeEvent} from "react";
import Modal from "react-modal";
import "./Login.css";
import { VisibleModal, RedirectToPage } from "./App";
import { API_URL } from "./constants";

interface ISignupProps {
    visible: boolean;
    setVisibleModal: (val: VisibleModal) => void;
    setRedirectToPage: (val: RedirectToPage) => void;
}

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

//export type LoginFn = (email: string, password: string) => Promise<Response>;
const signup = (name: string, email: string, password: string) => fetch(`${API_URL}/user`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({name, email, password})
});

export const Signup: React.FC<ISignupProps> = props => {
    const {visible, setVisibleModal, setRedirectToPage } = props;
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    
    const onSignupClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return signup(formData.name, formData.email, formData.password)
            .then(response => {
                console.log(response)
                if (response.status === 200) { //successful login!
                    setVisibleModal(null);
                    setRedirectToPage("signupsuccessful");
                    return response.json();
                }

                return null;
            })
            .then(data => {
                console.log(data)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, name: event.target.value})
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
                <h2>Signup</h2>
                <form onSubmit={onSignupClick}>
                <div>
                        <label>Name:</label>
                        <input type="text" id="name" name="name" onChange={onNameChange} />
                    </div>  
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