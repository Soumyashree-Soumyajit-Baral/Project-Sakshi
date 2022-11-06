import React, { useState} from 'react'
import './register.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [rdata, setrData] = useState({ userName: "", password: "", confirmpassword: "" });
    const [show,setshow]=useState(false)
    const[usererr,setuserError] = useState("user-false")
    const navigate = useNavigate();
    const handleData = (e) => {
        e.preventDefault();
        if(rdata.password === rdata.confirmpassword){
            console.log(rdata);
             axios({
                // url: "https://todo-server-pg.herokuapp.com/userRegister/register",
                url: "http://localhost:3001/userRegister/register",
                method: "POST",
                headers: {
                },
                data: rdata
            }).then((res) => {
                console.log(res);
                navigate("/");
            }).catch((err) => {
                if(err.response.data ==="UserExist"){
                    setuserError("user-true")
                    alert("User Name already exist")
                    setshow(!show)
                    setTimeout(()=>{
                        setshow(!setshow)
                    },2000)
                    console.log(err);
                }
            })
        }
        else{
            alert("password & confirm password are not matching")
        }
        setrData({userName:"", password:"", confirmpassword:""})
    }
    const inputHandler = (e,id)=>{
        if(id === "userName"){
            setrData({...rdata, userName:e.target.value})
        }else if(id === "password"){
            setrData({...rdata, password:e.target.value})
        }else if(id === "confirmpassword"){
            setrData({...rdata, confirmpassword:e.target.value})
        }
    }
    return (
        <>
            <div id='regisbody'>
            <div id='regisCard'>
              
                    <img className='icon' src='./register.png' alt=''/>
                    <h1>REGISTER</h1>
                        
                    
                    <form onSubmit={(e) => handleData(e)}>
                        <div className='userIn'><input id='userName'  onChange={(e) => inputHandler(e, "userName") } required className='regis' type="text"  value={rdata.userName} placeholder="User Name" ></input>
                        {/* <p className={usererr}>User already exist</p> */}
                        </div>
                        <div className='userIn'><input id='password' onChange={(e) => inputHandler(e, "password") } required className='regis' type="password" value={rdata.password} placeholder="Password" ></input></div>
                        <div className='userIn'><input id ='confirm-pass'  onChange={(e) => inputHandler(e, "confirmpassword")} required className='regis' type="password" value={rdata.confirmpassword} placeholder="Confirm Password" ></input>
                        {/* {show ? <span className='error1'>Username Exit</span> : ""} */}
                        </div>
                        <div className='userIn'>
                        <button id='register' type="submit" >Register</button>
                        </div>
                        
                    </form>
                    <div className='main'><a href='/'> Member Login </a></div>
                </div>
            </div>
        </>
    )
};
export default Register;
