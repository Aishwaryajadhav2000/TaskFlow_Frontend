import React, { useEffect, useState } from 'react'
import { createTaskservice, getTaskById, updateTaskService } from '../services/tasks.js';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UpdateTask() {

    const [description, setDescription] = useState("")
    const [descriptionError, setDescriptionError] = useState(false)

    const [taskAssign, setAssignTo] = useState("");
    const [taskAssignError, setAssignToError] = useState(false);

    const [taskStatus, setTaskStatus] = useState("");
    const [taskStatusError, setTaskStatusError] = useState(false);
  const [hasError , sethasError] = useState(false)
    const [owner, setOwner] = useState("");
    const location = useLocation();
    // const getCompanyName = location.state?.companyName;
    const taskId = location.state?.taskId;
    const navigate = useNavigate();

    useEffect(() => {
        // console.log(getCompanyName);
        console.log(taskId);

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
            } catch (err) {
                console.log(err)
            }
        };

        gettaskData();
    }, [taskId]);

    const updateTask = async (e) => {
        e.preventDefault();
        console.log("description", description);
        const taskData = { description, taskAssign, taskStatus };
        console.log("taskdata", taskData)

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
                                <option value="null">Select User</option>
                                <option value="aish">Aish</option>
                                <option value="mayur">Mayur</option>
                                <option value="mandar">Mandar</option>
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

                        <div className='mt-7 justify-center flex'>
                            <button className='bg-blue-500 p-3 w-3xs rounded-2xl text-white text-xl font-semibold' type='submit'>Update</button>
                        </div>
                    </form>
                </article>
            </section>
        </>
    )
}
