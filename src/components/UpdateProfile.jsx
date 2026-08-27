import React from 'react'
import  "../Profile.css"

export default function UpdateProfile() {
  return (
    <>
    <h1 className='text-2xl font-bold md:text-center my-5'>Update Profile</h1>
      <section className='mx-5 md:justify-center content-center items-center text-center md:flex'>
        <form action="" className='space-y-5 md:w-[50%]'>
          <label htmlFor="">Full Name</label>
          <input type="text" placeholder="Enter Name" className='updateProfInput'/>

          <label htmlFor="">UserName</label>
          <input type="text" placeholder='Enter Username' className='updateProfInput'/>

          <label htmlFor="">Phone</label>
          <input type="number" placeholder='Enter Phone' className='updateProfInput'/>

          <button className='w-full p-2 rounded-full bg-green-700 text-white'>Save Changes</button>
        </form>
      </section>
    </>
  )
}
