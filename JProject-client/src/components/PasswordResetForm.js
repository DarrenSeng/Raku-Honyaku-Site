import { useState } from 'react';
import { useParams, Link,useNavigate } from 'react-router-dom';
import { resetFormFields } from '../constants/formFields';
import FormAction from "./FormAction";
import Input from "./Input";
import Axios from 'axios';



const fields=resetFormFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function PasswordResetForm(){
  const [formState,setFormState]=useState(fieldsState);
  const navigate = useNavigate();
  const { userId, token } = useParams();
  async function verifyPasswordResetLink() {
    try {
        const response = await Axios.get(`http://localhost:3001/api/password-reset/${userId}/${token}`);
    } catch (error) {
        console.error("Error verifying password reset link:", error);
        navigate("/login"); 
    }
    };
    verifyPasswordResetLink();

  const handleChange=(e)=>setFormState({...formState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    pwResetForm()
  }

  const pwResetForm=async ()=>{
    const { password, confirmPassword } = formState;
    if (password !== confirmPassword) {
        console.log("Passwords do not match");
        return;
    }
    try {
        await Axios.post(`http://localhost:3001/api/password-reset/${userId}/${token}`, { password });
        alert("Password reset successfully");
    } catch (error) {
        alert("Error resetting password");
    }
  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={formState[field.id]}
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
          <FormAction handleSubmit={handleSubmit} text="Reset Password" />
        </div>

         

      </form>
    )
}