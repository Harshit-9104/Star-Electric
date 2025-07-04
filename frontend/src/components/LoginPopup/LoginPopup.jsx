import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import xmark from '../../assets/xmark.jpg'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {

    const {url, setToken} = useContext(StoreContext);

    const [currState, setCurrState] = useState('Login')
    const [data, setData] = useState({
        name : '',
        email : '', 
        password : ''
    })

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({...data, [name]: value}));
    }

    const onLogin = async (e) => {
        e.preventDefault();
        let newUrl = url;
        if(currState === "Login") {
            newUrl += "/api/user/login";
        }
        else {
            newUrl += "/api/user/register";
        }

        const response = await axios.post(newUrl, data);
        if(response.status === 200) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert("Error: " + response.data.message);
        }

    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className="login-container">
            <div className="login-title">
                <h2>{currState}</h2>
                <img onClick={()=>{setShowLogin(false)}} src={xmark} alt="" />
            </div>
            <div className="login-inputs">
                {currState==="Login"?<></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Username' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required/>
            </div>
            <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
            <div className="login-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy</p>
            </div>
            {currState==="Login"
                ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
                :<p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
            }
            </form>
    </div>
  )
}

export default LoginPopup