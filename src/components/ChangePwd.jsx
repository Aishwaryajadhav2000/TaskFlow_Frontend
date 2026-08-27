import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updatePass } from '../services/auth';

export default function ChangePwd() {

    const navigate = useNavigate();
    const [newPass, setNewPass] = useState('');
    const [passError, setPassError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPass === '') {
            setPassError(true)
        } else {
            const updatePassword = await updatePass(newPass);
            if (updatePassword.status == 200) {
                navigate('/')
            }
        }

    }
    return (
        <>


            <section className='mx-5  md:text-center'>
                <h1 className='text-2xl font-bold'>Update Password</h1> <br />
                <br />
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="" className='text-xl font-bold'>Enter New Password</label>


                    <div className='flex justify-center'>
                        <input className='mt-5 md:w-1/2 w-full rounded-xl text-2xl border' type="text" placeholder='Enter New Password' onChange={(e) => { setNewPass(e.target.value) }} />
                    </div>

                    <div className='text-red-700 font-semibold text-xl'>
                        {
                            passError && (
                                <small>Please fill the field</small>
                            )
                        }
                    </div> <br />
                    <div className='flex justify-center '>
                        <button type='submit' className='mt-5 w-full md:w-1/2 bg-blue-700 rounded-xl text-2xl p-3 text-white'>Submit</button>
                    </div>
                </form>

            </section>
        </>
    )
}
