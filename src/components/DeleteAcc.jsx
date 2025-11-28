import React, { useEffect } from 'react'
import { deleteUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

export default function DeleteAcc({companyName}) {

  const navigate = useNavigate();
  // const location = useLocation()
  // const companyName = location.state?.companyName;

  useEffect(()=>{
    console.log("company name" , companyName)
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

  return (
    <>
      <section>
        <div className='border border-black rounded-2xl p-5'>
          <button onClick={handleDeleteAccount}>Delete Your Account permenently</button>
        </div>
      </section>
    </>
  )
}
