import React, { useEffect, useState } from 'react'
import '../App.css'
import { registration } from '../services/auth.js';
import API_BASE_URL from '../services/common.js';
import { useNavigate } from "react-router-dom";
import { getCompaniesList } from '../services/company.js';

export default function CreateAdmin() {

  const [jobPosition, setJobPosition] = useState(false)
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [companyList, setCompanyList] = useState([])
  const [usernameError, setUsernameError] = useState(false)
  // const [userData, setUserData] = useState({ companyName, fullName, userName, phoneNo, gender, position, password });

  useEffect(() => {
    const getCompaniesNameFunction = async () => {
      const getCompaniesName = await getCompaniesList();
      // console.log("getcompaniesname" , getCompaniesName)
      const dataRes = await getCompaniesName.json()
      setCompanyList(dataRes.companies || [])
    }
    getCompaniesNameFunction();
  }, [])

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

    if (!companyName || !fullName || !userName || !phoneNo || !gender || !position || !password) {
      alert("please filled all the fields...")
    } else {
      try {
        const registerUser = await registration(userData);
        // if (registerUser.status == 200) {
        //   alert("USer created successfully");
        //   navigate('/')
        // }
        if (registerUser.status == 500) {
          setUsernameError(true)
        } else if (registerUser.status == 501) {
          alert("Admin already exist...")
        } else {
          alert("USer created successfully");
          navigate('/')
        }
      } catch (err) {
        alert(err.message)
      }
    }

    // registration(userData);
  }

  return (
    <>
      <section className='text-white text-lg md:h-screen w-full md:flex justify-center md:justify-between bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 p-3'>

        <article className='md:w-[30%] items-center flex justify-center'>
          {/* <div className='bg-purple-400 '>
            <i class="bi bi-people"></i>
            <h1>Create new user</h1>
            <p>Add a New User And Assign To Company With Appropriate Role and Permissions.</p>
          </div> */}
          <div className='p-5 text-center justify-center '>
            <i class="bi bi-people border p-2 px-4 rounded-full bg-blue-700 text-3xl md:text-7xl"></i>
            <h1 className='text-xl mt-5'>Create New USer</h1><br />
            <p>Add a New User And Assign To Company With Appropriate Role and Permissions.</p>
          </div><hr className='md:hidden' />
        </article>

        <article className='md:w-[70%]'>
          <form action="" className='border rounded-lg p-5 py-20' onSubmit={register}>


            <article className='md:grid grid-cols-2 md:space-x-5'>
              <article className='space-y-5 '>
                <div className=''>
                  <label htmlFor="">Select Company </label>
                  <select onChange={(e) => setCompanyName(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg'>
                    {
                      companyList.map((companies) => (
                        <option key={companies._id}>{companies.companyname}</option>
                      ))
                    }
                  </select>
                </div>

                <div className=''>
                  <label htmlFor="">Enter Fullname</label>
                  <input type="text" placeholder='Enter name' onChange={(e) => setFullName(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg' />
                </div>

                <div className=''>
                  <label htmlFor="">Create username</label>
                  <input type="text" placeholder='create username' onChange={(e) => setUserName(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg' />
                </div>
                {
                  usernameError && (
                    <div className='justify-center flex font-bold text-red-500'>
                      <small>Username already exist.. Please choose different username</small>
                    </div>
                  )
                }

                <div className=''>
                  <label htmlFor="">Phone No.</label>
                  <input type="number" placeholder='Enter Phone no' onChange={(e) => setPhoneNo(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg' />
                </div>

              </article>

              <article>
                <div className=''>
                  <label htmlFor="">Gender</label>
                  <div className='rounded-lg border border-gray-300 w-full h-fit md:h-10 flex flex-wrap px-2'>
                    <input type="radio" name="gender" value="male" onChange={(e) => setGender(e.target.value)} />Male
                    <input type="radio" name="gender" value="female" onChange={(e) => setGender(e.target.value)} className='ml-5' /> Female
                    <input type="radio" name="gender" value="none" onChange={(e) => setGender(e.target.value)} className='ml-5' /> Prefer not to say
                  </div>
                </div>

                <div className='mt-5'>
                  <label htmlFor="">Select position</label>
                  <select name="" id="" className='border border-gray-300 w-full h-10 rounded-lg' onChange={(e) => setPosition(e.target.value)}>
                    <option value="">Select</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className='space-y-2'>
                  <label htmlFor="">Create Password</label>
                  <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} className='border border-gray-300 w-full h-10 rounded-lg' />
                  <input type="text" placeholder='confirm password' className='border border-gray-300 w-full h-10 rounded-lg' />
                </div>

              </article>
            </article>

            <article>
              <div className=' mt-5 flex justify-center'>
                <button className='bg-gradient-to-r from-blue-400 to-pink-700 text-white font-semibold text-xl p-2 w-3xs rounded-2xl' type='submit'>
                  <i class="bi bi-person-add"></i> Create Admin
                </button>
              </div>
            </article>

          </form>

        </article>
      </section>
    </>
  )
}
