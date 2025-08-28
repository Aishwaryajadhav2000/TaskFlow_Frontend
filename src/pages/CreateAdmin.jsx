import React, { useState } from 'react'
import '../App.css'
import { registration } from '../services/auth.js';
import API_BASE_URL from '../services/common';

export default function CreateAdmin() {

  const [jobPosition, setJobPosition] = useState(false)
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  // const [userData, setUserData] = useState({ companyName, fullName, userName, phoneNo, gender, position, password });

  const register = async (e) => {
    e.preventDefault();
    console.log("Clicked");

    const userData = {
      companyName,
      fullName,
      userName,
      phoneNo,
      gender,
      position,
      password
    };

    registration(userData);
  }

  return (
    <>
      <section className=' h-screen flex justify-center'>

        <article className='m-5'>
          <div>
            <h1>Create new user</h1>
          </div>

          <form action="" className='border w-3xl p-10' onSubmit={register}>

            <div className='flex'>
              <label htmlFor="">Enter Company Name</label>
              <input type="text" placeholder='Company name' onChange={(e) => setCompanyName(e.target.value)} />
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Enter Fullname</label>
              <input type="text" placeholder='Enter name' onChange={(e) => setFullName(e.target.value)} />
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Create username</label>
              <input type="text" placeholder='create username' onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Phone No.</label>
              <input type="number" placeholder='Enter Phone no' onChange={(e) => setPhoneNo(e.target.value)} />
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Gender</label>
              <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />Male
              <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} className='ml-4' /> Female
              <input type="radio" name="gender" value="none" onChange={(e) => setGender(e.target.value)} className='ml-4' /> Prefer not to say
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Select position</label>
              <select name="" id="" className=' w-3xs' onChange={(e) => setPosition(e.target.value)}>
                <option value="">Select</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className='flex  mt-5'>
              <label htmlFor="">Create Password</label>
              <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
              <input type="text" placeholder='confirm password' className='ml-1.5' />
            </div>

            <div className=' mt-5 flex justify-center'>
              <button className='bg-amber-700 text-white font-semibold text-xl p-2 w-3xs rounded-2xl' type='submit'>
                Create Admin
              </button>
            </div>

          </form>

        </article>
      </section>
    </>
  )
}
