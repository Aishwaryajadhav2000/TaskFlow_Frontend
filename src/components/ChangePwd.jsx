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
            <h1>Update Password</h1> <br />

            <section>
                <br />
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder='add new password' onChange={(e) => { setNewPass(e.target.value) }} />
                    <div className='text-red-700 font-semibold text-xl'>
                        {
                            passError && (
                                <small>Please fill the field</small>
                            )
                        }
                    </div> <br />
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
