import React from "react";
import "./login.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";


const Login = () => {
    const Navigate=useNavigate();

    const [data,setdata]=useState({
        "userName":"",
        "password":""
      })

      const handlesubmit=(e)=>{
        e.preventDefault()
        axios.post("http://localhost:3001/userRegister/login",data).then((loginData)=>{
          localStorage.setItem("authorization",loginData.data.Authtoken)        
          localStorage.setItem("userName", loginData.data.userName)
        
        Navigate("/body")
        })
        .catch((err)=>{
          console.log(err)
         })
}

      const handleinput=(e,id)=>{
        setdata({...data,[id]:e.target.value})
          }

    return(
        <>
      <div id="loginPg">
      <div id='loginCard'>
        <img src="./images.png" alt ="logo" className='log' />
            
        
        <h1>Member Login</h1>
            <form className="form">
                <input type="text" placeholder='UserName' required className='userinput'  onChange={(e)=>handleinput(e,"userName")}/>
                <input type="password" placeholder="Password" required className='userinput'  onChange={(e)=>handleinput(e,"password")}/>
            </form>
            <button className='userB' onClick={(e)=>handlesubmit(e)}>Login</button>
            <div className='bottom'>
                 <div className='b1'>
                    <a href='/register'>Register?</a>
                    <span className='b2'>Forgot password?</span>
                     </div>
                
                
            </div>
        </div>
      </div>
        </>
    )
}
export default Login
