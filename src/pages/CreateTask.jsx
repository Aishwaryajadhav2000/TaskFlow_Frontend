import React, { useEffect, useState } from 'react'
import { createTaskservice } from '../services/tasks.js';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CreateTask() {

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false)

  const [taskAssign, setAssignTo] = useState("");
  const [taskAssignError, setAssignToError] = useState(false);

  const [taskStatusError, setTaskStatusError] = useState(false);
  const [taskStatus, setTaskStatus] = useState("");
  const [owner, setOwner] = useState("");
  const location = useLocation();
  const getCompanyName = location.state?.companyName;
  const navigate = useNavigate();
  const [hasError , sethasError] = useState(false)

  useEffect(() => {
    console.log(getCompanyName)
  })

  const createTask = async (e) => {
    e.preventDefault();
    const data = { description, taskAssign, taskStatus }

    //Task description
    if (description === "") {
      setDescriptionError(true);
      sethasError(true)
    } else {
      setDescriptionError(false)
    }

    //Task Assign
    if (taskAssign === "null" || taskAssign === '') {
      setAssignToError(true)
      sethasError(true)
    } else {
      setAssignToError(false)
    }

    //task status
    if (taskStatus === "null" || taskStatus === '') {
      setTaskStatusError(true)
      sethasError(true)
    } else {
      setTaskStatusError(false)
    }


    if (!hasError) {
      try {
        const createResponse = await createTaskservice(data);
        if (createResponse.status === 200) {
          navigate('/')
          alert("Task created successfully...")
        }

      } catch (err) {
        console.log("error");
        alert(err.message)
      }
    }



    // createTaskservice(data);
  }

  return (
    <>
      <section>
        <article className='flex align-middle justify-center h-screen'>
          <form action="" className='border border-black w-4xl m-10  p-6' onSubmit={createTask}>
            <div>
              <label htmlFor="" className='block'>Description</label>
              <textarea name="" id="" className='border border-black block w-full m-5 h-28' onChange={(e) => setDescription(e.target.value)}></textarea>
              {descriptionError === true && (<div className='flex justify-center'><h1>Please Add description</h1></div>)}

            </div>

            <div className='flex gap-10 mt-7'>
              <label htmlFor="">Assign to</label>
              <select name="" id="" className='border border-black  p-2' onChange={(e) => setAssignTo(e.target.value)}>
                <option value="null">Select User</option>
                <option value="aish">Aish</option>
                <option value="mayur">Mayur</option>
                <option value="mandar">Mandar</option>
              </select>
              {taskAssignError === true && (<div className='flex justify-center'><h1>Please select user to assign</h1></div>)}
            </div>

            <div className='flex gap-10 mt-7'>
              <label htmlFor="">Select Status</label>
              <select name="" id="" className='border border-black  p-2' onChange={(e) => setTaskStatus(e.target.value)}>
                <option value="null">Select status</option>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In progress</option>
                <option value="Completed">Complete</option>
              </select>
              {taskStatusError === true && (<div className='flex justify-center'><h1>Please select status</h1></div>)}
            </div>

            <div className='mt-7 justify-center flex'>
              <button className='bg-blue-500 p-3 w-3xs rounded-2xl text-white text-xl font-semibold' type='submit'>Submit</button>
            </div>
          </form>
        </article>
      </section>
    </>
  )
}
