import React, { useEffect, useState } from 'react'
import { findTaskByCompany } from '../services/tasks.js'
import { useLocation } from 'react-router-dom';

export default function ViewTasks() {

  const location = useLocation()
  const companyname = location.state?.companyName;
  const [allUserTasks, setAllUserTasks] = useState([])

  useEffect(() => {
    console.log(companyname)

    const getTask = async () => {
      try {
        const result = await findTaskByCompany(companyname);
        // setAllUserTasks(result?.tasks || []); // important
        // console.log("result", result)
        // console.log("result", result.AllTasks.tasks)
        setAllUserTasks(result.AllTasks.tasks); // important
        console.log("allUserTasks", result.AllTasks.tasks)
      } catch (err) {
        console.log("error", err);
      }
    };
    getTask();
  }, [companyname])

  return (
    <>
      <h1 className='text-center text-2xl mb-3'>All Tasks : {allUserTasks.length}</h1>
      <ol className='space-y-3 md:flex flex-wrap p-2'>
        {allUserTasks.map((tasks, index) => (
          <li className={`tasklist rounded-lg p-5 md:w-1/3 shadow-md w-full ${tasks.taskStatus === "Completed" ? "complete" : tasks.taskStatus === "ToDo" ? "todo" : "inprogress"}`} >
            <div className=''>
              <p> {tasks.description}</p>
            </div>
            <div className='hidden md:block space-y-2 mt-2'>
              <h1>Task Status : {tasks.taskStatus}</h1>
              <h1>Task Assign To : {tasks.taskAssign}</h1>
            </div>
          </li>

        ))}
      </ol>
    </>
  )
}
