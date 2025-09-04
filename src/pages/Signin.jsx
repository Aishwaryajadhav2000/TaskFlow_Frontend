import React, { useEffect, useState } from 'react'
import '../App.css'
import { useLocation, useNavigate } from "react-router-dom";
import { registration } from '../services/auth';

export default function Signin() {

  const [position, setJobPosition] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state?.companyName;

  useEffect(() => {
    console.log("Company name", userData);
    setCompanyName(userData)
  });

  const createNewUser = async (e) => {
    e.preventDefault();
    const userData = {
      companyName,
      fullName,
      userName,
      phoneNo,
      gender,
      position,
      password
    };

    if (!companyName || !fullName || !userName || !phoneNo || !gender || !position || !password) {
      alert("please filled all the fields...")
    } else {
      try {
        const registerUser = await registration(userData);
        if (registerUser.status == 200) {
          alert("USer created successfully");
          navigate('/')
        }
      } catch (err) {
        alert(err.message)
      }
    }


    // registration(userData)
  }

  return (
    <>
      <section className=' h-screen flex justify-center'>

        <article className='m-5'>
          <div>
            <h1>Create new user</h1>
          </div>

          <form action="" className='border w-3xl p-10' onSubmit={createNewUser}>

            <div className='flex justify-center text-2xl'>
              <h1>{userData}</h1>
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
              <select name="" id="" onChange={(e) => setJobPosition(e.target.value)}>
                <option value="">Select</option>
                <option value="hr">HR</option>
                <option value="frontend developer">Frontend Developer</option>
                <option value="backend developer">Backend Developer</option>
                <option value="software tester">Software Tester</option>
                <option value="web developer">Web Developer</option>
                <option value="other">Other</option>
              </select>
              {
                position === "other" && (
                  <input type="text" className='ml-2' placeholder='specify job position' onChange={(e) => setJobPosition(e.target.value)} />
                )
              }
            </div>

            <div className='flex  mt-5'>
              <label htmlFor="">Create Password</label>
              <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
              <input type="text" placeholder='confirm password' className='ml-1.5' />
            </div>

            <div className=' mt-5 flex justify-center'>
              <button className='bg-amber-700 text-white font-semibold text-xl p-2 w-3xs rounded-2xl' type='submit'>
                Create User
              </button>
            </div>





          </form>

        </article>
      </section>
    </>
  )
}
