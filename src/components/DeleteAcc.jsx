import React, { useEffect } from 'react'
import { deleteUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function DeleteAcc({ companyName }) {

  const navigate = useNavigate();

  useEffect(() => {
    console.log("company name", companyName)
  })
  4
  const handleDeleteAccount = async () => {

    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        const deletingUser = await deleteUser(companyName);
        const data = await deletingUser.json();
        if (deletingUser.status == 200) {
          alert(data.message)
          localStorage.removeItem("loginstatus");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate('/')
          window.location.reload();
        }
      } catch {
        console.log("error", err)
      }
    } else {
      console.log("deleting cancel")
    }
  }
  const cancel = () => {
    navigate('/')
    console.log("clicked cancel")
  }



  return (
    <>
      <section className=' mx-7 space-y-5'>
        <div className='text-center space-y-5 justify-center flex'>
          <div className='md:w-[70%] p-5 border-x-red-500 border-y-white border-2'>
            <div className='text-2xl '>
              <i class="bi bi-exclamation-triangle text-5xl text-red-700"></i>
              <h1 className='mt-5'>Delete Your Account Permanently</h1>
            </div>
            <div className=''>
              <p>This action cannot be undone. All your data will be permanently removed from our system.</p>
            </div>
          </div>

        </div>
        <div className='flex justify-center'>
          <button onClick={handleDeleteAccount} className='bg-pink-700 text-white w-full md:w-[50%] p-3 rounded-full text-2xl'>Delete My Account</button>
        </div>
        <div className='flex justify-center'>
          <button onClick={cancel} className='border border-purple-700 w-full md:w-[50%] p-3 rounded-lg text-xl'>Cancel</button>
        </div>
      </section>
    </>
  )
}
