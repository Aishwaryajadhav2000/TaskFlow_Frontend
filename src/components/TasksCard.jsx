import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { deleteTaskserv } from '../services/tasks.js';
import '../App.css'
import { X } from 'lucide-react';
import { getUsersByCompany } from '../services/company.js';
import DisplayImage from './DisplayImage.jsx';

export default function TasksCard({ task, index, setDisplayTask, company }) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [displayImage, setDisplayImage] = useState(null)
    const [taskImage, settaskImage] = useState(false)

    useEffect(() => {
        console.log("tasksbdjhdbjsd", task);
        // console.log("companyname", company)

    }, [task]);

    useEffect(() => {
        if (!company) return;  // ✅ skip if empty

        const fetchAllUsers = async () => {
            const getUSers = await getUsersByCompany(company);
            setUsers(getUSers.users);
        };

        fetchAllUsers();
    }, [company]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    const updateTask = (taskId) => {
        console.log("function clicked", taskId);
        navigate('/updatetask', { state: { taskId: taskId, user: users } })
    }

    const deleteTask = async (taskId) => {
        // deleteTaskserv(taskId)
        const deleteRes = await deleteTaskserv(taskId);
        if (deleteRes.status == 200) {
            alert("Task deleted...");
            window.location.reload()
        }
    }
    return (
        <>

            {
                displayImage && (

                    <div className='fixed inset-20 flex items-center justify-center bg-black/0 backdrop-blur-sm z-50'>
                        <div className="bg-white rounded-xl shadow-lg p-6 w-[600px] max-w-[100%] h-[100%] flex flex-col">
                            <DisplayImage image={task.taskImage} display={setDisplayImage}></DisplayImage>
                        </div>
                    </div>
                )
            }
            <section className='overflow-y-auto'>
                <article className=''>
                    <div className='flex justify-end' onClick={(e) => setDisplayTask(null)}><X></X></div>
                </article>

                <article className={`${task.taskStatus === "Completed" ? "taskcardComplete" : task.taskStatus === "ToDo" ? "taskcardTodo" : "taskcardProgress"}`}>

                    <div className={`m-5 text-2xl font-semibold`}>
                        <p> {task.description}</p>
                    </div>

                    <hr /><br />

                    <div className='flex justify-between'><h1>Assign To - <b>{task.taskAssign}</b></h1><h1><b>{task.taskStatus}</b></h1></div>

                    <br />

                    {
                        task.taskImage && task.taskImage !== "undefined" && task.taskImage !== "null" &&(
                            <div>
                                <img
                                    src={`http://localhost:8000/${task.taskImage}`}
                                    alt="taskimage" className='w-[200px] h-[150px]'
                                    // style={{ width: "200px", height: "150px", objectFit: "cover" }}
                                    onClick={() => (setDisplayImage(true))} />
                            </div>
                        )
                    }
                    <br />

                    <div className='flex mt-6 gap-5'>
                        <button className='p-3 rounded-3xl pl-4 pr-4' onClick={() => deleteTask(task._id)}>
                            Delete Task
                        </button>
                        <button className='p-3 rounded-3xl pl-4 pr-4' onClick={() => updateTask(task._id)}>
                            Edit Task
                        </button>
                    </div>

                </article>

                {/* <article className=''>

                <div className='flex justify-between'><h1>Assign To - <b>{tasks.taskAssign}</b></h1><h1><b>{tasks.taskStatus}</b></h1></div>
                <hr /><br />
                <p> {tasks.description}</p>
                <div className='flex mt-6 gap-5'>
                    <button className='p-3 rounded-3xl pl-4 pr-4' onClick={() => deleteTask(tasks._id)}>
                        Delete Task
                    </button>
                    <button className='p-3 rounded-3xl pl-4 pr-4' onClick={() => updateTask(tasks._id)}>
                        Edit Task
                    </button>
                </div>

            </article> */}


            </section>
        </>



    );
}
