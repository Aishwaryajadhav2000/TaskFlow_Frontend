import React from 'react'
import { deleteUser } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function DeleteAcc() {

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
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
      console.log(err)
    }
  }

  return (
    <>
    <section>
        <div>
          <button onClick={handleDeleteAccount}>Delete Your Account permenently</button>
        </div>
      </section>
    </>
  )
}
