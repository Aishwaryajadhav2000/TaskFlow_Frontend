import React, { useEffect, useState } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getFullProfile } from '../services/auth';

export default function ClientHeader({ companyName, users, phoneMenu }) {

    const navigate = useNavigate();
    const [jobPosition, setJobPosition] = useState(null)
    const [disabledPhoneMenu, setDisabledPhoneMenu] = useState(false)

    const addTask = (e) => {
        e.preventDefault();
        navigate('/addtask', { state: { companyName: companyName, users: users } });
        phoneMenu(disabledPhoneMenu)
    }
    const profile = () => {
        navigate('/profile')
        phoneMenu(disabledPhoneMenu)
    }
    const viewTask = () => {
        navigate('viewtasks', { state: { companyName: companyName } })
        phoneMenu(disabledPhoneMenu)
    }


    const logout = (e) => {
        localStorage.removeItem("loginstatus");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate('/')
        window.location.reload();
    }

    useEffect(() => {
        const fetchUser = async () => {
            const profile = await getFullProfile();
            console.log("profile", profile);
            if (profile.position === "admin") {
                setJobPosition(profile.position)
            }
        };
        fetchUser();

    }, []);

    return (
        <>

            <li className='headerBtn'><Link to="/" onClick={() => phoneMenu(false)}>Home</Link></li>

            <li className='headerBtn'><button onClick={addTask} >Add Tasks</button></li>

            {/* <li className='headerBtn'><Link to="/viewtasks">View Tasks</Link></li> */}
            <li className='headerBtn'><button onClick={viewTask} >View Tasks</button></li>


            <li className='headerBtn'><button onClick={() => { profile() }}>Profile</button></li>

            {
                jobPosition && (

                    <li className='headerBtn'><button onClick={() => navigate('/signup', { state: { companyName: companyName } })}>CreateUser</button></li>

                )
            }

            <li className='headerBtn'><Link onClick={() => { logout() }} >Logout</Link></li>
        </>
    )
}
