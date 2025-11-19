import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updatePass } from '../services/auth';

export default function ChangePwd() {

    const navigate = useNavigate();
    const [newPass, setNewPass] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const updatePassword = await updatePass(newPass);
        if (updatePassword.status == 200) {
            navigate('/')
        }
    }
    return (
        <>
            <section className='text-2xl text-center items-center align-middle justify-center flex'>
             

                <article>
                    <br />
                    <form action="" onSubmit={handleSubmit} className=' border border-black p-10 pr-32 pl-32'>
                        <div>   <h1>Update Password</h1></div> <br />
                        <input type="text" placeholder='add new password' onChange={(e) => { setNewPass(e.target.value) }} />
                        
                        <br /><div>
                            <button type='submit' className='border border-black p-3 rounded-2xl '>Submit</button>
                        </div>
                    </form>
                </article>
            </section>
        </>
    )
}
