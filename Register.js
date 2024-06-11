import React from "react";
import './Register.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import {ToastContainer, toast }from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function Register(){
    const navigate=useNavigate();
    const [error, setError]=useState('')
    const [loading,setLoading]=useState(false)
    const [fullname, setFullname]=useState('')
    const [email,setEmail]=useState('')
    const [contact,setContact]=useState('')
    const [address,setAddress] =useState('')
    const [gender,setGender]=useState('')
    const [npass,setNpass]=useState('')
    const [cpass,setCpass]=useState('')

    const onChangeFullname =(e)=>{
        setFullname(e.target.value)
    }
    const onChangeEmail =(e)=>{
        setEmail(e.target.value)
    }
    const onChangeContact =(e)=>{
        setContact(e.target.value)
    }
    const onChangeAddress =(e)=>{
        setAddress(e.target.value)
    }
    const onChangeGender =(e)=>{
        setGender(e.target.value)
    }
    const onChangeNpass =(e)=>{
        setNpass(e.target.value)
    }
    const onChangeCpass =(e)=>{
        setCpass(e.target.value)
    }
    const notify = (message)=>toast(message);
    const onRegister= async (e)=>{
        e.preventDefault();
        if(fullname.length===0){
            setError('Fill your fullname')
        }
        else if(email.length===0){
            setError('Fill your email ID ')
        }
        else if(contact.length===0){
            setError('Fill your Contact')
        }
        else if(address.length===0){
            setError('Fill your address')
        }
        else if(gender.length===0){
            setError('Select your gender')
        }
        else if(npass.length===0){
            setError('create your new password')
        }
        else if(cpass.length===0){
            setError('Confirm your password')
        }
        else{
            if(npass===cpass){
                setError('')
                setLoading(true)
                const res = await fetch('http://localhost/react/register.php',{
                    method:'POST',
                    headers:{
                        'Content-type':'application/json'
                    },
                    body:JSON.stringify({fullname,email,contact,address,gender, npass,cpass})
                })
                const data = await res.json();
                console.log(data)
                notify('User registered successfully !!')
                setTimeout(()=>{
                    setLoading(false)
                    if(data.status===true){
                        navigate("/")
                    }
                },1200);
            }else{
                setNpass('')
                setCpass('')
                setError("Password doesn't match !!")
            }
        }
    }

    return(
        <div className="register">
            <div className="contain">
                <div className="title">
                    <h2>Register Here!!!</h2>
                </div>
                <div className="sign-up">
                    <form onSubmit={onRegister}>
                        <div className="input-field">
                            <label>Full Name</label>
                            <input type="text" value={fullname} onChange={onChangeFullname} className={loading ? 'process': ''}></input>
                        </div>
                        <div className="input-field">
                            <label>Email ID</label>
                            <input type="email" value={email} onChange={onChangeEmail} className={loading ? 'process': ''}></input>
                        </div>
                        <div className="input-field">
                            <label>Contact</label>
                            <input type="number" value={contact} onChange={onChangeContact} className={loading ? 'process': ''}></input>
                        </div>
                        <div className="input-field">
                            <label>Address</label>
                            <input type="text" value={address} onChange={onChangeAddress} className={loading ? 'process': ''}></input>
                        </div>
                        <div className="input-field">
                            <label>Gender</label>
                            <select name="gender" value={gender} onChange={onChangeGender} className={loading ? 'process': ''}>
                                <option value="select">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label>New Password</label>
                            <input type="Password" value={npass} onChange={onChangeNpass} className={loading ? 'process': ''}></input>
                        </div>
                        <div className="input-field">
                            <label>Confirm Password</label>
                            <input type="Password" value={cpass} onChange={onChangeCpass} className={loading ? 'process': ''}></input>
                        </div>
                        <div className="input-field">
                            <input type="submit" value="Sign Up" className={loading ? 'process': ''}></input>
                        </div>
                        <div className="input-field">
                            <p className="error">{error}</p>
                        </div>
                        <div className="login-link">
                            <p>Have an account</p>
                            <Link to="/">Go to Login</Link>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}
export default Register;