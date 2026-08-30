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
  const [usernameError, setUsernameError] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
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
    } else if (password !== confirmPassword) {
      setPasswordError(true)
    } else {
      try {
        const registerUser = await registration(userData);
        const data = await registerUser.json()
        if (registerUser.status == 500) {
          // alert(data.message);
          setUsernameError(true);
        }
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
      <section className='text-white text-lg md:h-screen w-full md:flex justify-center md:justify-between bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 p-3'>

        <article className='md:w-[30%] items-center flex justify-center'>
          <div className='p-5 text-center justify-center '>
            <i class="bi bi-people border p-2 px-4 rounded-full bg-blue-700 text-3xl md:text-7xl"></i>
            <h1 className='text-xl mt-5'>Create New USer</h1><br />
            <p>Add a New User And Assign To Company With Appropriate Role and Permissions.</p>
          </div><hr className='md:hidden' />
        </article>

        <article className='md:w-[70%]'>

          <form action="" className='border space-y-5 rounded-lg p-5 py-20' onSubmit={createNewUser}>
            <div className='flex justify-center text-2xl'>
              <h1>{userData}</h1>
            </div>

            <article className='md:grid grid-cols-2 md:space-x-5'>
              <article className='space-y-5 '>

                <div>
                  <label htmlFor="">Enter Fullname</label>
                  <input type="text" placeholder='Enter name' onChange={(e) => setFullName(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg'/>
                </div>

                <div>
                  <label htmlFor="">Create username</label>
                  <input type="text" placeholder='create username' onChange={(e) => setUserName(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg'/>
                </div>
                {
                  usernameError && (
                    <div className='justify-center flex font-bold text-red-500'>
                      <small>Username already exist.. Please choose different username</small>
                    </div>
                  )
                }

                <div>
                  <label htmlFor="">Phone No.</label>
                  <input type="number" placeholder='Enter Phone no' onChange={(e) => setPhoneNo(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg'/>
                </div>
              </article>

              <article>
                <div>
                  <label htmlFor="">Gender</label>
                  <div className='rounded-lg border border-gray-300 w-full h-fit md:h-10 flex flex-wrap px-2'>
                    <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />Male
                    <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} className='ml-4' /> Female
                    <input type="radio" name="gender" value="none" onChange={(e) => setGender(e.target.value)} className='ml-4' /> Prefer not to say
                  </div>
                </div>

                <div className='mt-5'>
                  <label htmlFor="">Select position</label>
                  <select className='border border-gray-300 w-full h-10 rounded-lg' name="" id="" onChange={(e) => setJobPosition(e.target.value)}>
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

                <div className='space-y-2'>
                  <label htmlFor="">Create Password</label>
                  <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg'/>
                  <input type="text" placeholder='confirm password' onChange={(e) => setConfirmPassword(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg'/>
                </div>
                {
                  passwordError && (
                    <div className='justify-center flex font-bold text-red-500'>
                      <small>Password not matched</small>
                    </div>
                  )
                }
              </article>

            </article>

            <article>
              <div className=' mt-5 flex justify-center'>
                <button className='bg-gradient-to-r from-blue-400 to-pink-700 text-white font-semibold text-xl p-2 w-3xs rounded-2xl' type='submit'>
                  <i class="bi bi-person-add"></i> Create User
                </button>
              </div>
            </article>

          </form>

        </article>

      </section>
    </>
  )
}
