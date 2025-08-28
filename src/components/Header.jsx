import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'

export default function Header() {

    const [loginPage, setLoginPage] = useState(false);
    const navigate = useNavigate();
    // const [logoutBtn, setLogoutBtn] = useState(false);
    const [loginBtn, setLoginBtn] = useState(true)
    const logindetail = localStorage.getItem("loginstatus")


    useEffect(() => {
        if (logindetail == null) {
            setLoginBtn(true)
        } else {
            setLoginBtn(false)
        }
    })

    const logout = (e) => {
        localStorage.removeItem("loginstatus");
        localStorage.removeItem("user");
        alert("User logout")
        navigate('/')
    }

    const addTask = (e) => {
        e.preventDefault();
        console.log("function cclicked");
        console.log("login details", logindetail)
        if (logindetail == null) {
            setLoginPage(true)
        } else {
            navigate('/addtask');

        }
    }



    return (
        <>
            <section className='m-5 border border-black p-10 flex justify-center'>
                <nav >
                    <ul className='flex list-none gap-10'>
                        <li><Link to="/">Home</Link></li>
                        <li><button onClick={addTask}>Add Tasks</button></li>
                        <li><Link to="/viewtasks">View Tasks</Link></li>
                        <li><Link to="/contact">Contact us</Link></li>
                        {loginBtn == false && (<li><button onClick={() => {}}>Profile</button></li>)}
                        {loginBtn == true && (<li><button onClick={() => { setLoginPage(true) }}>Login</button></li>)}
                        {loginBtn == false && (<li><button onClick={() => { logout() }}>Logout</button></li>)}
                    </ul>
                </nav>
            </section>

            {
                loginPage === true && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                            <Login></Login>
                        </div>

                    </div>
                )
            }
        </>
    )
}
