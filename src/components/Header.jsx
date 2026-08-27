import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import { getFullProfile } from '../services/auth.js';
import '../App.css';
import logo from '../assets/logo.png'
import { getUsersByCompany } from '../services/company.js';
import DevHeader from '../developer/DevHeader.jsx';
import ClientHeader from './ClientHeader.jsx';

export default function Header() {

    const [loginPage, setLoginPage] = useState(false);
    const [userProf, setUserProf] = useState("")
    const navigate = useNavigate();
    // const [logoutBtn, setLogoutBtn] = useState(false);
    const [loginBtn, setLoginBtn] = useState(true)
    const logindetail = localStorage.getItem("loginstatus");
    const [createAdminBtn, setCreateAdminBtn] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [getCompanyName, setGetComapanyName] = useState("");
    const [users, setUsers] = useState([]);
    const [developerSite, setDeveloperSite] = useState(false);
    const [clientSite, setClientSite] = useState(false);
    const [phoneMenu, setPhoneMenu] = useState(false)

    useEffect(() => {
        if (logindetail == null) {
            setLoginBtn(true)
        } else {
            setLoginBtn(false);
            const fetchUser = async () => {
                const profile = await getFullProfile();
                console.log("getting companyname", profile)
                setGetComapanyName(profile.companyname);
                if (profile.companyname === "aishsCreation") {
                    setCreateAdminBtn(true);
                    setDeveloperSite(true)
                } else {
                    setClientSite(true)
                }
                if (profile.position === "admin") {
                    setCreateUser(true)
                }
            };
            fetchUser();
        }


    }, [getCompanyName]);

    useEffect(() => {
        if (!getCompanyName) return;

        const fetchAllUsers = async () => {
            const getUSers = await getUsersByCompany(getCompanyName);
            setUsers(getUSers.users);
        };

        fetchAllUsers();
    }, [getCompanyName]);

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
            navigate('/addtask', { state: { companyName: getCompanyName, users: users } });
        }
    }

    const handleScroll = () => {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }

    const profile = () => {
        navigate('/profile')
    }


    return (
        <>
            <section className={`p-5 md:border border-gray-200 md:p-10 ${loginBtn === true ? 'flex justify-end' : ''}`}>
                <ul className="md:flex md:gap-16 gap-2 hidden">
                    <li className='hidden md:block'> <img src={logo} alt="" className='h-14' /></li>

                    {
                        developerSite && loginBtn == false ? (
                            <DevHeader></DevHeader>
                        ) : clientSite && loginBtn == false ? (
                            <ClientHeader companyName={getCompanyName} users={users}>

                            </ClientHeader>
                        ) : (
                            <div>
                                {loginBtn == true && (<li><button onClick={() => { setLoginPage(true) }} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-5 rounded-lg '>Login</button></li>)}

                            </div>
                        )
                    }
                </ul>

                {/* mobile header */}
                <ul className='w-full md:hidden justify-between flex font-bold px-3 py-1.5'>
                       {loginBtn == false ? ( <li><button onClick={() => setPhoneMenu(true)}>Menu</button></li>):(<li><button onClick={() => { setLoginPage(true) }} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-5 rounded-lg '>Login</button></li>)}
                        <li> <img src={logo} alt="" className='h-14' /></li>
                    </ul>
                    {
                        phoneMenu && (
                            <div className='fixed bg-white rounded-2xl px-3'>
                                <div className='text-end text-2xl text-red-800 mx-3 font-bold' onClick={()=>setPhoneMenu(false)}>X</div>
                                <ul className='space-y-2'>
                                {
                                    developerSite  ? (
                                        <DevHeader phoneMenu={phoneMenu}></DevHeader>
                                    ) :(
                                        <ClientHeader companyName={getCompanyName} users={users} phoneMenu={setPhoneMenu}>

                                        </ClientHeader>
                                    ) 
                                }
                            </ul>
                            </div>
                        )
                    }
            </section>

            {/* <section className='md:hidden'>
                <div className='bg-red-600 p-3 border border-black fixed h-screen'>
                    <ul>
                        {
                            developerSite ? (
                                <DevHeader></DevHeader>
                            ) : (
                                <ClientHeader companyName={getCompanyName} users={users}>

                                </ClientHeader>
                            )
                        }
                    </ul>
                </div>
            </section> */}

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
