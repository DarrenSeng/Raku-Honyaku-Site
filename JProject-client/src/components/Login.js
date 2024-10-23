import { useState, useEffect, useContext } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const fields = loginFields;
let fieldsState = { };
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const { login } = useContext(AuthContext);
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate()

    useEffect(() => {
        const sid = localStorage.getItem('sid')
        if (sid) {
            autoLogin(sid);
        }
    }, []);

    const handleChange = (e) => {
        const { id, type, checked, value } = e.target;
        setLoginState(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    const autoLogin = async (sid) => {
        const { email, password } = loginState;
        
        try {
            const response = await fetch(`http://localhost:3001/api/auth`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json()
                console.log(data)
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    const authenticateUser = async () => {
        const { email, password,  } = loginState;
        console.log(`http://localhost:3001/api/auth`)
        try {
            const response = await fetch(`http://localhost:3001/api/auth`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            if (response.ok) {
                const data = await response.json()
                localStorage.setItem('sid', data.sid);
                localStorage.setItem('uid', data.userID)
                login();
                navigate("/home")
            } else {
                console.log("Login Failed")
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />
                    )
                }
            </div>

            <FormExtra handleChange={handleChange} loginState={loginState} />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    )
}
