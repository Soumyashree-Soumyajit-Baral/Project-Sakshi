import React from 'react'
 import './header.css'
const Header=()=> {
    const Authtoken=localStorage.getItem("authorization");
    const UserName = localStorage.getItem("userName");
    console.log(UserName)
  return (
    <>
      <div id="header1">
        <p className='paraUser'>{UserName}</p>
        
      </div>
    </>
  )
}

export default Header
