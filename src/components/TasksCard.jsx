import React, { useEffect } from 'react'
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { deleteTaskserv } from '../services/tasks.js';
import '../App.css'

export default function TasksCard({ tasks }) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("tasksbdjhdbjsd", tasks)

    }, [tasks]);

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
        navigate('/updatetask', { state: { taskId: taskId } })
    }

    const deleteTask = async(taskId) => {
        // deleteTaskserv(taskId)
        const deleteRes = await deleteTaskserv(taskId);
        if(deleteRes.status == 200){
            alert("Task deleted...");
            window.location.reload()
        }
    }
    return (
        <section>
            <div className='m-2.5'>
                <h1>Task Created by you - {tasks.length}</h1>
            </div>
            <section className='w-7xl border p-6'>
                <ul className='flex flex-wrap gap-5 justify-center'>
                    {tasks.map((data, index) => (
                        <li key={index} className={`tasklist p-6 rounded-lg w-96 shadow-md ${data.taskStatus === "Completed" ? "complete" : data.taskStatus === "ToDo" ? "todo" : "inprogress"}`}>
                            <div className='flex justify-between'><h1>Assign To - <b>{data.taskAssign}</b></h1><h1><b>{data.taskStatus}</b></h1></div>
                            <hr /><br />
                            <p> {data.description}</p>
                            {/* <div className='flex'>
                                    <h3>Task Status - <b>{data.taskStatus}</b></h3>
                                </div> */}

                            <div className='flex mt-6 gap-5'>
                                <button className='p-3 rounded-3xl pl-4 pr-4' onClick={() => deleteTask(data._id)}>
                                    Delete Task
                                </button>
                                <button className='p-3 rounded-3xl pl-4 pr-4' onClick={() => updateTask(data._id)}>
                                    Edit Task
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {/* <h1>Task Assign To - <b>{data.taskAssign}</b></h1>
                        <p> {data.description}</p>
                        <div className='flex'>
                            <h3>Task Status - <b>{data.taskStatus}</b></h3>
                        </div>
                        <div className='flex items-end justify-end'>
                            <button className='bg-red-800 p-3 rounded-3xl pl-4 pr-4' onClick={() => deleteTask(data._id)}>
                                Delete Task
                            </button>
                        </div>
                        <div className='flex items-end justify-end'>
                            <button className='bg-red-800 p-3 rounded-3xl pl-4 pr-4' onClick={() => updateTask(data._id)}>
                                Edit Task
                            </button>
                        </div> */}

            </section>
        </section>


    );
}
