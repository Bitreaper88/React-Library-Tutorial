import React, {useState, ChangeEvent} from "react";

interface ILoginProps {
    login: (email: string, password: string) => Promise<Response>
    setAuthenticated: (authenticated: boolean) => void
}

export const Login: React.FC<ILoginProps> = props => {
    const { login, setAuthenticated } = props;
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    
    const onLoginClick = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        return login(formData.email, formData.password)
            .then(response => {
                console.log(response)
                if (response.status === 200)
                    return response.json()
                return null;
            })
            .then(data => {
                console.log(data)
                if (data && data.token) {
                    localStorage.setItem("token", data.token);
                    setAuthenticated(true);
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
        <div>
            <h2>Login</h2>
            <form onSubmit={onLoginClick}>
                <label>Email:</label>
                <input type="text" id="email" name="email" onChange={onEmailChange} />
                <label>Password:</label>
                <input type="password" id="password" name="password" onChange={onPasswordChange} />
                <input type="submit" />
            </form>
        </div>
    )
}
