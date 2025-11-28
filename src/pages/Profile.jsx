import React, { useEffect, useState } from 'react'
import { deleteUser, getFullProfile, updatePass } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import  "../Profile.css"
import ChangePwd from '../components/ChangePwd';
import DeleteAcc from '../components/DeleteAcc';
import UpdateProfile from '../components/UpdateProfile';

export default function Profile() {

  
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [changePwd , setChangePwd] = useState(false);
  const [deleteAcc , setDeleteAcc] = useState(false)
  const [updateProfile , setUpdateProfile] = useState(false)

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
        <article className='flex m-5'>
          <button className='profilebtns' onClick={()=>{setChangePwd(true); setDeleteAcc(false);setUpdateProfile(false) }}>Change Password ?</button>
          
          <button className='profilebtns' onClick={()=>{setDeleteAcc(true); setUpdateProfile(false) ; setChangePwd(false)}}>Delete Your account permenently ?</button>
          
          <button className='profilebtns' onClick={()=>{setUpdateProfile(true);  setDeleteAcc(false) ; setChangePwd(false)}}>Update Profile ?</button>

        </article>
      </section>

            <hr /><br />

      <section >
        {
          changePwd  && (
            <ChangePwd></ChangePwd>
          )
        }
      </section>

      <section className='flex justify-center'>
        {
          deleteAcc && (
            <DeleteAcc companyName={companyName}></DeleteAcc>
          )
        }
      </section>

      <section className='flex justify-center'>
        {
          updateProfile && (
            <UpdateProfile></UpdateProfile>
          )
        }
      </section>
      

    </>
  )
}
