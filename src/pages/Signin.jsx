import React, { useState } from 'react'
import '../App.css'

export default function Signin() {

  const [jobPosition , setJobPosition] = useState(false)

  return (
    <>
      <section className=' h-screen flex justify-center'>

        <article className='m-5'>
          <div>
            <h1>Create new user</h1>
          </div>

          <form action="" className='border w-3xl p-10'>

            <div className='flex justify-center text-2xl'>
              <h1>Company Name Here</h1>
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Enter Fullname</label>
              <input type="text" placeholder='Enter name' />
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Create username</label>
              <input type="text" placeholder='create username' />
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Phone No.</label>
              <input type="number" placeholder='Enter Phone no'/>
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Gender</label>
              <input type="radio" name="gender" value="male" />Male
              <input type="radio" name="gender" value="female" className='ml-4'/> Female
              <input type="radio" name="gender" value="none" className='ml-4'/> Prefer not to say
            </div>

            <div className='flex mt-5'>
              <label htmlFor="">Select position</label>
              <select name="" id="" value={jobPosition} onChange={(e)=> setJobPosition(e.target.value)}>
                <option value="">Select</option>
                <option value="hr">HR</option>
                <option value="frontend developer">Frontend Developer</option>
                <option value="backend developer">Backend Developer</option>
                <option value="software tester">Software Tester</option>
                <option value="web developer">Web Developer</option>
                <option value="other">Other</option>
              </select>
              {
                jobPosition === "other"  &&(
                  <input type="text" className='ml-2'/>
                )
              }
            </div>

            <div className='flex  mt-5'>
              <label htmlFor="">Create Password</label>
              <input type="text" placeholder='password'/>
              <input type="text" placeholder='confirm password' className='ml-1.5' />
            </div>

            <div className=' mt-5 flex justify-center'>
              <button className='bg-amber-700 text-white font-semibold text-xl p-2 w-3xs rounded-2xl'>
                Create User
                </button>
            </div>





          </form>

        </article>
      </section>
    </>
  )
}
