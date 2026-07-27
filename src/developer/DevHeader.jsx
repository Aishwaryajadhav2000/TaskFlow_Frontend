import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function DevHeader() {
    const navigate = useNavigate()

    const profile = () => {
        navigate('/profile')
    }
    const logout = (e) => {
        localStorage.removeItem("loginstatus");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate('/')
        window.location.reload();
    }
    return (
        <>
            <li className='headerBtn'><Link to="/">Home</Link></li>

            <li className='headerBtn'><button onClick={() => { profile() }}>Profile</button></li>

            <li className='headerBtn'><button onClick={() => navigate('/createadmin')}>CreateAdmin</button></li>

            <li className='headerBtn'><button onClick={() => navigate('/createorg')}>CreateNewClient</button></li>

            <li className='headerBtn'><button onClick={() => { logout() }} >Logout</button></li>
        </>
    )
}
