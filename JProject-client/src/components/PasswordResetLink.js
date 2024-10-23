import { useState } from 'react';
import { resetFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";

const fields=resetFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function PasswordResetLink(){
    const [resetState,setResetState]=useState(fieldsState);

    const handleChange=(e)=>{
        setResetState({...resetState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        resetPasswordLink();
    }

    const resetPasswordLink = async() =>{
        const { email} = resetState;
        try {
            const response = await fetch(`http://localhost:3001/api/password-reset`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email})
            });
            if (response.ok) {
                const data = await response.json()
                alert("Password Rest Link Sent")
            } else {
                alert("Password Reset Link failed to send")
            }
        }  catch(error) {
            console.log("Error",error)
        }
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={resetState[field.id]}
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

        <FormAction handleSubmit={handleSubmit} text="Send Password Reset Link"/>

      </form>
    )
}