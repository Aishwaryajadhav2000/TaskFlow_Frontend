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
        console.log("allUserTasks", allUserTasks)
      } catch (err) {
        console.log("error", err);
      }
    };
    getTask();
  }, [companyname])

  return (
    <>
    <h1>{allUserTasks.length}</h1>
      {allUserTasks.map((tasks, index) => (
        <li className={`tasklist rounded-lg w-96 shadow-md ${tasks.taskStatus === "Completed" ? "complete" : tasks.taskStatus === "ToDo" ? "todo" : "inprogress"}`} >
          <div className='p-7'>
            <p> {tasks.description}</p>
          </div>
          {/* <TasksCard tasks={tasks} index={tasks._id}></TasksCard> */}
        </li>
      ))}
    </>
  )
}
