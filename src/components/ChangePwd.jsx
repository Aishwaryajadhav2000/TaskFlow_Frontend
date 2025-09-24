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
            <h1>Update Password</h1> <br />

            <section>
                <br />
                <form action="" onSubmit={handleSubmit}>
                    <input type="text" placeholder='add new password' onChange={(e) => { setNewPass(e.target.value) }} />
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
