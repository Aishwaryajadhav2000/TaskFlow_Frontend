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
  const [hasError, sethasError] = useState(false);
  const getUSers = location.state?.users;
  const [taskImage , setTaskImage] = useState(null)
  

  useEffect(() => {
    console.log(getCompanyName);
    console.log("users" , getUSers)
  }, [getCompanyName]);


  const createTask = async (e) => {
    e.preventDefault();
    // const data = { description, taskAssign, taskStatus , taskImage};
    
    const data = new FormData();
    data.append('description' , description)
    data.append('taskAssign' , taskAssign)
    data.append('taskStatus' , taskStatus)
    data.append('taskImage' , taskImage);

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
        }else{
          alert(createResponse.message)
        }

      } catch (err) {
        console.log("error");
        alert(err.message)
      }
    }
    // createTaskservice(data);
  }

  const handleFileChange = (e)=>{
    setTaskImage(e.target.files[0])
  }

  return (
    <>
      <section>
        <article className='flex align-middle justify-center h-screen'>
          <form action="" className='border border-black w-4xl m-10  p-6' onSubmit={createTask}>
            <div>
              <label htmlFor="" className='block'>Description</label>
              <textarea name="" id="" className='border border-black w-full m-5 h-28 text-center item-center flex' onChange={(e) => setDescription(e.target.value)}></textarea>
              {descriptionError === true && (<div className='flex justify-center'><h1>Please Add description</h1></div>)}

            </div>

            <div className='flex gap-10 mt-7'>
              <label htmlFor="">Assign to</label>
              <select name="" id="" className='border border-black  p-2' onChange={(e) => setAssignTo(e.target.value)}>
                {
                  getUSers.map((user)=>(
                    <option key={user._id}>{user.fullname}</option>
                  ))
                }
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

            <div className='mt-7'>
              <input type="file" placeholder='Add Screenshot' onChange={handleFileChange}/>
            </div>



            <div className='mt-7 justify-center flex'>
              <button className='bg-blue-500 p-3 w-3xs rounded-2xl text-white text-xl font-semibold cursor-pointer' type='submit'>Submit</button>
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
