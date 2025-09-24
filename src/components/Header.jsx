import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Login from './Login'
import { getFullProfile } from '../services/auth.js';
import '../App.css';
import logo from '../assets/logo.png'
import { getUsersByCompany } from '../services/company.js';
import DevHeader from './DevHeader.jsx';
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
    const [developerSite , setDeveloperSite] = useState(false);
    const [clientSite , setClientSite] = useState(false)

    useEffect(() => {
        if (logindetail == null) {
            setLoginBtn(true)
        } else {
            setLoginBtn(false);
            const fetchUser = async () => {
                const profile = await getFullProfile(); 
                console.log("getting companyname",profile)
                setGetComapanyName(profile.companyname);
                if (profile.companyname === "aishsCreation") {
                    setCreateAdminBtn(true);
                    setDeveloperSite(true)
                }else{
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
        if (!getCompanyName) return;  // ✅ skip if empty

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
            navigate('/addtask', { state: { companyName: getCompanyName , users : users}});
        }
    }

    const handleScroll = () => {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    }

    const profile = () =>{
        navigate('/profile')
    }


    return (
        <>
            <section className={`m-5 border border-gray-200  p-10 flex justify-center ${loginBtn === true ? 'flex justify-end' : ''}`}>
                <nav className='flex w-full'>
                    {/* <div className='w-full'>
                     <img src={logo} alt="" className='logo'/>
                   </div> */}
                    <ul className="flex list-none gap-16">
                        <li> <img src={logo} alt="" className='h-14' /></li>
                        {/* {loginBtn == false && (<li className='headerBtn'><Link to="/">Home</Link></li>)}
                        {loginBtn == false && (<li className='headerBtn'><button onClick={addTask} >Add Tasks</button></li>)}
                        {loginBtn == false && (<li className='headerBtn'><Link to="/viewtasks">View Tasks</Link></li>)}
                        {loginBtn == false && (<li className='headerBtn'><button onClick={() => {profile()}}>Profile</button></li>)}
                        {createAdminBtn === true && (<li className='headerBtn'><button onClick={() => navigate('/createadmin')}>CreateAdmin</button></li>)}
                        {createUser === true && (<li className='headerBtn'><button onClick={() => navigate('/signup', { state: { companyName: getCompanyName } })}>CreateUser</button></li>)}
                        {loginBtn == true && (<li><button onClick={() => { setLoginPage(true) }} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-5 rounded-lg '>Login</button></li>)}
                        {loginBtn == false && (<li className='headerBtn'><button onClick={() => { logout() }} >Logout</button></li>)} */}
                        {
                            developerSite && loginBtn == false ? (
                                <DevHeader></DevHeader>
                            ) : clientSite && loginBtn == false ? (
                                <ClientHeader companyName = {getCompanyName}  users = {users}>
                                     
                                </ClientHeader>
                            ):(
                                <div>
                                {loginBtn == true && (<li><button onClick={() => { setLoginPage(true) }} className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-5 rounded-lg '>Login</button></li>)}

                                </div>
                            )
                        }
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
