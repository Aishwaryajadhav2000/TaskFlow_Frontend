import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function DevHeader({ phoneMenu }) {
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
            <li className='headerBtn'>
                <i className="bi bi-house-door"></i>
                <Link to="/" className='' onClick={() => phoneMenu(false)}>
                    Home
                </Link>
            </li>

            <li className='headerBtn'><i class="bi bi-person"></i><Link to="/profile" onClick={() => { phoneMenu(false); }} >Profile</Link></li>

            <li className='headerBtn'>
                <i class="bi bi-shield-check"></i>
                <button onClick={() => { navigate('/createadmin') ; phoneMenu(false)}}>CreateAdmin</button>
            </li>

            <li className='headerBtn'><i class="bi bi-people"></i><Link to="/createorg" onClick={() => { phoneMenu(false); }}>
            CreateNewClient</Link>
            </li>

            <li className='headerBtn'><i class="bi bi-box-arrow-right"></i><Link onClick={() => { logout() }} >Logout</Link></li>
        </>
    )
}
