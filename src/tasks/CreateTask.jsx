import React, { useEffect, useState } from 'react'
import { createTaskservice } from '../services/tasks.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getUsersByCompany } from '../services/company.js';

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
  const [hasError, sethasError] = useState(true);
  const getUSers = location.state?.users;
  const [taskImage, setTaskImage] = useState(null)


  useEffect(() => {
    console.log(getCompanyName);
    console.log("users", getUSers)
  }, [getCompanyName]);


  const createTask = async (e) => {
    e.preventDefault();
    // const data = { description, taskAssign, taskStatus , taskImage};
    console.log("creating taskkk")
    const data = new FormData();
    data.append('description', description)
    data.append('taskAssign', taskAssign)
    data.append('taskStatus', taskStatus)
    data.append('taskImage', taskImage);

    //Task description
    if (description === "") {
      setDescriptionError(true);
    } else {
      setDescriptionError(false)
      sethasError(false)
    }

    //Task Assign
    if (taskAssign === "null" || taskAssign === '') {
      setAssignToError(true)
    } else {
      setAssignToError(false)
      sethasError(false)
    }

    //task status
    if (taskStatus === "null" || taskStatus === '') {
      setTaskStatusError(true)
    } else {
      setTaskStatusError(false)
      sethasError(false)
    }

    if (!hasError) {
      try {
        const createResponse = await createTaskservice(data);
        if (createResponse.status === 200) {
          navigate('/')
          alert("Task created successfully...")
        } else {
          alert(createResponse.message)
        }

      } catch (err) {
        console.log("error");
        alert(err.message)
      }
    }
    // createTaskservice(data);
  }

  const handleFileChange = (e) => {
    setTaskImage(e.target.files[0])
  }

  return (
    <>
      <section className='bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600'>

        <article className="relative w-full justify-center flex rounded-2xl px-6 py-5 text-white">

          <div className="grid grid-cols-[64px_1fr] items-center gap-5">

            {/* Icon */}
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl text-indigo-600 shadow-md">
              <i className="bi bi-card-checklist"></i>
            </div>

            {/* Text */}
            <div>
              <h1 className="text-xl font-bold">
                Add New Task
              </h1>

              <p className="mt-1 text-lg text-white/90">
                Create a new task and assign it to a team member.
              </p>
            </div>

          </div>

          {/* Decorative curves */}
          <div className="absolute -bottom-10 -right-10 h-28 w-full rounded-[50%] border-t border-white/20"></div>
          <div className="absolute -bottom-14 -left-20 h-28 w-full rounded-[50%] border-t border-white/20"></div>

        </article>
        <article className='flex align-middle justify-center min-h-screen'>
          <form action="" className='bg-white border border-black rounded-2xl w-4xl m-10  p-6' onSubmit={createTask}>
            <div>
              <label htmlFor="" className='block'>Description</label>
              <textarea placeholder='Write Task Description ...' name="" id="" className='border border-black rounded-2xl w-full h-28 text-center item-center flex' onChange={(e) => setDescription(e.target.value)}></textarea>
              {descriptionError === true && (<div className='flex justify-center text-red-500 font-bold'><h1>Please Add description</h1></div>)}

            </div>

            <div className='md:flex gap-10 mt-7'>
              <label htmlFor="">Assign to</label>
              <select name="" id="" className='border border-black rounded-lg  w-full md:w-1/2' onChange={(e) => setAssignTo(e.target.value)}>
                {
                  getUSers.map((user) => (
                    <option key={user._id}>{user.fullname}</option>
                  ))
                }
              </select>
            </div>
            {taskAssignError === true && (<div className='justify-center text-red-500 flex font-bold'><h1>Please select user to assign</h1></div>)}


            <div className='md:flex gap-10 mt-7'>
              <label htmlFor="">Select Status</label>
              <select name="" id="" className='border border-black rounded-lg w-full md:w-1/2' onChange={(e) => setTaskStatus(e.target.value)}>
                <option value="null">Select status</option>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In progress</option>
                <option value="Completed">Complete</option>
              </select>
            </div>
            {taskStatusError === true && (<div className='flex justify-center text-red-500 font-bold'><h1>Please select status</h1></div>)}


            <div className='mt-7 space-y-2'>
              <h1>Upload File (Optional)</h1>
              <div>
                <input type="file" placeholder='Add Screenshot' onChange={handleFileChange} className='' />
              </div>
            </div>


            <div className='mt-7 justify-center flex'>
              <button className='bg-blue-500 p-3 w-full md:w-3xs rounded-2xl text-white text-xl font-semibold cursor-pointer' type='submit'>Save Task</button>
            </div>

            <div className='mt-7 justify-center flex'>
              <Link className='p-3 md:w-3xs w-full rounded-2xl border border-black text-xl font-semibold text-center' to="/">X Cancel</Link>
            </div>
          </form>
        </article>
      </section>
    </>
  )
}
