import './Login.css';
import React, {useState, useEffect, useContext} from 'react'
import * as reactRouterDom from 'react-router-dom';
import {AuthContext} from './services/AuthContext'
import {Navigate} from 'react-router-dom'

const Login = () => {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const {login, isLoggedIn}=useContext(AuthContext);

            if (isLoggedIn) {
                return <Navigate to="/home" />;
            }
    async function handleSubmit(e){
        e.preventDefault()
       fetch('https://sheskill-latest.onrender.com/login',{
           method:'POST',
           headers:{
               'Content-Type':'application/json'
               },
               body:JSON.stringify({emailId:email,password:password})
           }).then(response=>{
               if(!response.ok){
                   throw new Error('Network response was not ok')
                   }
               return response.json()
               }).then(data=>{
                   console.log(data)
                   console.log(data.name)
                   console.log(data.email)
                   console.log(data.token)
                   login(data.token,{emailId:data.email,name:data.name})

                   }).catch(error=>{
                       console.error('There was a problem with the fetch operation',error)
                       })

        }


    return (
<>
            <div className="login-container">
                <div className="login-left">
                    <img src="images/girl6.png" alt="Logo" className="logo-image" />
                </div>
                <div className="login-right">
                    <div className="login-box">
                        <div style={{ textAlign: 'center' }}><h2>Login</h2></div>
                        <form  method="POST" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username" required
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password" required
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}/>
                            </div>
                            <div className="forgot-password">
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                            <button type="submit">Login</button>
                        </form>
                        <div className="create-account">
                            <p>Don't have an account? <reactRouterDom.Link to="/signup">Sign up</reactRouterDom.Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
