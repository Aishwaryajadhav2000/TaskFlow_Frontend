import React, { useEffect, useState } from 'react'
import { createTaskservice, getTaskById, updateTaskService } from '../services/tasks.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function UpdateTask() {

    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState(false)

    const [taskAssign, setAssignTo] = useState("");
    const [taskAssignError, setAssignToError] = useState(false);

    const [taskStatus, setTaskStatus] = useState("");
    const [taskStatusError, setTaskStatusError] = useState(false);
    const [hasError, sethasError] = useState(false)
    const [owner, setOwner] = useState("");
    const location = useLocation();
    const [taskImage, setTaskImage] = useState(null)
    // const getCompanyName = location.state?.companyname;
    const taskId = location.state?.taskId;
    const navigate = useNavigate();
    const users = location.state?.user

    useEffect(() => {
        // console.log("companyname",getCompanyName);
        // console.log(taskId);
        console.log("users", users)

        if (!taskId) {
            alert("Please provide task id");
            return
        }


        const gettaskData = async () => {
            try {
                const tasksdata = await getTaskById(taskId);
                console.log("task", tasksdata);
                setDescription(tasksdata.task.description);
                setAssignTo(tasksdata.task.taskAssign);
                setTaskStatus(tasksdata.task.taskStatus)
                setTaskImage(tasksdata.task.taskImage)
            } catch (err) {
                console.log(err)
            }
        };

        gettaskData();
    }, [taskId]);

    const handleFileChange = (e) => {
        setTaskImage(e.target.files[0])
    }

    const updateTask = async (e) => {
        e.preventDefault();
        console.log("description", description);
        // const taskData = { description, taskAssign, taskStatus , taskImage};
        // console.log("taskdata", taskData)
        const taskData = new FormData();
        taskData.append('description', description)
        taskData.append('taskAssign', taskAssign)
        taskData.append('taskStatus', taskStatus)
        taskData.append('taskImage', taskImage);

        //Task description
        if (description === "") {
            setDescriptionError(true);
            sethasError(true)
        } else {
            setDescriptionError(false)
        }

        //Task Assign
        if (taskAssign === "null") {
            setAssignToError(true)
            sethasError(true)
        } else {
            setAssignToError(false)
        }

        //task status
        if (taskStatus === "null") {
            setTaskStatusError(true)
            sethasError(true)
        } else {
            setTaskStatusError(false)
        }

        if (!hasError) {
            try {
                const updateRes = await updateTaskService(taskId, taskData);
                if (updateRes.status === 200) {
                    alert("Task updated successfully...");
                    navigate('/')
                }
            } catch (err) {
                console.log(err.message)
            }
        }

        // updateTaskService(taskId,taskData);

    }

    return (
        <>
            <section>
                <article className='flex align-middle justify-center h-screen'>
                    <form action="" className='border border-black w-4xl m-10  p-6' onSubmit={updateTask}>
                        <div>
                            <label htmlFor="" className='block'>Description</label>
                            <textarea name="" id="" className='border border-black w-full m-5 h-28 text-center item-center flex' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            {descriptionError === true && (<div className='flex justify-center'><h1>Please Add description</h1></div>)}
                        </div>

                        <div className='flex gap-10 mt-7'>
                            <label htmlFor="">Assign to</label>
                            <select name="" id="" className='border border-black  p-2' value={taskAssign} onChange={(e) => setAssignTo(e.target.value)}>
                                {/* <option value="null">Select User</option>
                                <option value="aish">Aish</option>
                                <option value="mayur">Mayur</option>
                                <option value="mandar">Mandar</option> */}
                                {
                                    users.map((user) => (
                                        <option key={user._id}>{user.fullname}</option>
                                    ))
                                }
                            </select>
                            {taskAssignError === true && (<div className='flex justify-center'><h1>Please select user to assign</h1></div>)}
                        </div>

                        <div className='flex gap-10 mt-7'>
                            <label htmlFor="">Select Status</label>
                            <select name="" id="" className='border border-black  p-2' value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                                <option value="null">Select status</option>
                                <option value="ToDo">To Do</option>
                                <option value="InProgress">In progress</option>
                                <option value="Completed">Complete</option>
                            </select>
                            {taskStatusError === true && (<div className='flex justify-center'><h1>Please select status</h1></div>)}
                        </div>

                        <br />
                        {
                            taskImage && taskImage !== "undefined" || "null"  ? (
                                <div>
                                    <img src={`http://localhost:8000/${taskImage}`}
                                        alt="taskimage" className='w-[200px] h-[150px]' />
                                </div>
                            ) :  (
                                <div>
                                    <input type="file" placeholder='Add Screenshot' onChange={handleFileChange} />

                                </div>
                            ) 
                        }

                        <div className='mt-7 justify-center flex'>
                            <button className='bg-blue-500 p-3 w-3xs rounded-2xl text-white text-xl font-semibold' type='submit'>Update</button>
                        </div>

                        <div className='mt-7 justify-center flex'>
                            <Link className='bg-blue-500 p-3 w-3xs rounded-2xl text-white text-xl font-semibold text-center' to="/">Cancel</Link>
                        </div>
                    </form>
                </article>
            </section>
        </>
    )
}
