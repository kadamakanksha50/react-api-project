import './Login.css';
import { useState } from 'react';
import React from 'react';
import {ToastContainer, toast }from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
 
function Login(){
    const [user, setUser]=useState('')
    const [pass,setPass]=useState('')
    const [isloading, setLoading]=useState(false)
    const navigate=useNavigate();
    useEffect(()=>{
        let user=localStorage.getItem('token')
        if(user!=null){
            navigate('/Dashboard')
        }
    },[])

    const onChangeUser = (e) =>{
        setUser(e.target.value)
    }
    const onChangePass = (e) =>{
        setPass(e.target.value)
    }
    const notify = (message) => toast(message);

    const onLogin=async (e) =>{
        e.preventDefault();
        setLoading(true)
        if(user != '' && pass != ''){
            setLoading(true)
            const res = await fetch('http://localhost/react/login.php',{
                method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({user,pass})
            })
            const data = await res.json();
            setTimeout(() =>{
                setLoading(false)
                if(data.message === '1'){
                    notify('Login Successfull !!')
                    setTimeout(()=>{
                        localStorage.setItem('token',user)
                        navigate('/Dashboard')
                    }, 3500)
                }else{
                    notify('Login Failed !!')
                }
            },1000)
        }
    }
    return(
        <div className='container'>
            <div className='login'>
                <div className='title'>
                    <h2>Sign In</h2>
                </div>
                <form onSubmit={onLogin}>
                    <div className='input-field'>
                        <input type='email' placeholder='username' value={user} onChange={onChangeUser} className={isloading ? 'process' : ''}></input>
                    </div>
                    <div className='input-field'>
                        <input type='password' placeholder='password' value={pass} onChange={onChangePass} className={isloading ? 'process' : ''}></input>
                    </div>
                    <div className='input-field'>
                        <input type='submit' value={isloading ? 'Please wait...' : 'Sign In'}></input>
                    </div>
                </form>
                <div className='regi-link'>
                    <p>Don't have an account</p>
                    <Link to="/Register">Create your Account</Link>
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
export default Login;