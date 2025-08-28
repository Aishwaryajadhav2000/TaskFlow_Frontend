import React, { useState } from 'react'
import { createTaskservice } from '../services/tasks.js';

export default function CreateTask() {

  const [description, setDescription] = useState("")
  const [taskAssign, setAssignTo] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [owner, setOwner] = useState("")

  const createTask = (e) => {
    e.preventDefault();
    console.log("Creating Task");
    const data = { description, taskAssign, taskStatus }
    console.log("data", data);

    createTaskservice(data);
  }

  return (
    <>
      <section>
        <article className='flex align-middle justify-center h-screen'>
          <form action="" className='border border-black w-4xl m-10  p-6' onSubmit={createTask}>
            <div>
              <label htmlFor="" className='block'>Description</label>
              <textarea name="" id="" className='border border-black block w-full m-5 h-28' onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div className='flex gap-10 mt-7'>
              <label htmlFor="">Assign to</label>
              <select name="" id="" className='border border-black  p-2 ' onChange={(e) => setAssignTo(e.target.value)}>
                <option value="aish">Aish</option>
                <option value="mayur">Mayur</option>
              </select>
            </div>

            <div className='flex gap-10 mt-7'>
              <label htmlFor="">Select Status</label>
              <select name="" id="" className='border border-black  p-2 ' onChange={(e) => setTaskStatus(e.target.value)}>
                <option value="ToDo">To Do</option>
                <option value="InProgress">In progress</option>
                <option value="Completed">Complete</option>
              </select>
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
