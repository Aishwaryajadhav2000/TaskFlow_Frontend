import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../services/auth.js';

export default function Login() {

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const loginHandle = (e) => {
    e.preventDefault();
    console.log("username", username)
    console.log("login clicked");
    const credentials = {username , password}
   
    loginUser(credentials);
  }

  return (
    <>
      <section className='flex justify-center'>
        <form action="" className='border p-10' onSubmit={loginHandle}>
          <div className='flex gap-3'>
            <label htmlFor="">Username</label>
            <input type="text" placeholder='enter username' className='border p-1 ' onChange={(e) => setUserName(e.target.value)} />
          </div>

          <div className='flex gap-4 mt-5'>
            <label htmlFor="">Password</label>
            <input type="text" placeholder='enter password' className='border p-1' onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div >
            <button className='bg-blue-900 w-full rounded text-white mt-5 p-1' type='submit'>Login</button>
          </div>


        </form>
      </section>
    </>
  )
}
