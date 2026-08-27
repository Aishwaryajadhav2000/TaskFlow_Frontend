import React, { useEffect, useState } from 'react'
import { deleteUser, getFullProfile, updatePass } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import "../Profile.css"
import ChangePwd from '../components/ChangePwd';
import DeleteAcc from '../components/DeleteAcc';
import UpdateProfile from '../components/UpdateProfile';

export default function Profile() {

  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [changePwd, setChangePwd] = useState(false);
  const [deleteAcc, setDeleteAcc] = useState(false)
  const [updateProfile, setUpdateProfile] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const profile = await getFullProfile();
      console.log("profile", profile);
      setCompanyName(profile.companyname)
    };
    fetchUser();
  }, []);


  return (
    <>

      <section>
        <div className='flex justify-center'><h1>What you want to do ? </h1></div>
        <article className='flex justify-center space-x-3 text-xl m-5'>
          <button className='profilebtns border-2 border-blue-800' onClick={() => { setChangePwd(true); setDeleteAcc(false); setUpdateProfile(false) }}><p><i class="bi bi-lock text-blue-600 text-2xl"></i></p>Change Password ?</button>

          <button className='profilebtns border-red-800 border-2' onClick={() => { setDeleteAcc(true); setUpdateProfile(false); setChangePwd(false) }}><p><i class="bi bi-trash3 text-red-600 text-2xl"></i></p> Delete Your account permenently ?</button>

          <button className='profilebtns border-green-800 border-2' onClick={() => { setUpdateProfile(true); setDeleteAcc(false); setChangePwd(false) }}><p><i class="bi bi-person-circle text-green-600 text-2xl"></i></p> Update Profile ?</button>

        </article>
      </section>
  
      <hr /><br />

      <section >
        {
          changePwd && (
            <ChangePwd></ChangePwd>
          )
        }
      </section>

      <section className=''>
        {
          deleteAcc && (
            <DeleteAcc companyName={companyName}></DeleteAcc>
          )
        }
      </section>

      <section>
        {
          updateProfile && (
            <UpdateProfile></UpdateProfile>
          )
        }
      </section>


    </>
  )
}
