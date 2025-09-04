import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import { getFullProfile } from '../services/auth.js';
import '../App.css';
import logo from '../assets/logo.png'

export default function Header() {

    const [loginPage, setLoginPage] = useState(false);
    const [userProf, setUserProf] = useState("")
    const navigate = useNavigate();
    // const [logoutBtn, setLogoutBtn] = useState(false);
    const [loginBtn, setLoginBtn] = useState(true)
    const logindetail = localStorage.getItem("loginstatus");
    const [createAdminBtn, setCreateAdminBtn] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [getCompanyName, setGetComapanyName] = useState("")

    useEffect(() => {
        if (logindetail == null) {
            setLoginBtn(true)
        } else {
            setLoginBtn(false);
            const fetchUser = async () => {
                const profile = await getFullProfile(); // 👈 call service
                setGetComapanyName(profile.companyname);
                if (profile.username === "aish") {
                    setCreateAdminBtn(true);
                }
                if (profile.position === "admin") {
                    setCreateUser(true)
                }
            };
            fetchUser();
        }
    }, [getCompanyName])

    const logout = (e) => {
        localStorage.removeItem("loginstatus");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate('/')
         window.location.reload();
    }

    const addTask = (e) => {
        e.preventDefault();
        if (logindetail == null) {
            setLoginPage(true)
        } else {
            navigate('/addtask', { state: { companyName: getCompanyName } });
        }
    }

    const handleScroll = () => {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }



    return (
        <>
            <section className={`m-5 border border-gray-200  p-10 flex justify-center ${loginBtn === true ? 'flex justify-end' : ''}`}>
                <nav className='flex w-full'>
                   {/* <div className='w-full'>
                     <img src={logo} alt="" className='logo'/>
                   </div> */}
                    <ul className="flex list-none gap-16">
                        <li> <img src={logo} alt="" className='h-14'/></li>
                        {loginBtn == false && (<li className='headerBtn'><Link to="/">Home</Link></li>)}
                        {loginBtn == false && (<li ><button onClick={addTask} className='headerBtn'>Add Tasks</button></li>)}
                        {loginBtn == false && (<li className='headerBtn'><Link to="/viewtasks">View Tasks</Link></li>)}
                        {/* <li><button onClick={handleScroll} className='headerBtn'>Contact us</button></li> */}
                        {loginBtn == false && (<li className='headerBtn'><button onClick={() => { }}>Profile</button></li>)}
                        {createAdminBtn === true && (<li className='headerBtn'><button onClick={() => navigate('/createadmin')}>CreateAdmin</button></li>)}
                        {createUser === true && (<li className='headerBtn'><button onClick={() => navigate('/signup', { state: { companyName: getCompanyName } })}>CreateUser</button></li>)}
                        {loginBtn == true && (<li><button onClick={() => { setLoginPage(true) }} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-5 rounded-lg '>Login</button></li>)}
                        {loginBtn == false && (<li><button onClick={() => { logout() }} className='headerBtn'>Logout</button></li>)}
                    </ul>
                </nav>
            </section>

            {
                loginPage === true && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                            <Login pageDisplay={setLoginPage}></Login>
                        </div>

                    </div>
                )
            }
        </>
    )
}
