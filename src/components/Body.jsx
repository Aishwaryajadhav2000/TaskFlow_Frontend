import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import '../App.css'
import { getFullProfile } from '../services/auth';
import TasksCard from '../tasks/TasksCard.jsx';
import { findTaskByUserService } from '../services/tasks.js';
import { useLocation } from 'react-router-dom';
import { getUsersByCompany } from '../services/company.js';
import DevBody from '../developer/DevBody.jsx';

export default function Body() {
  const [userFullName, setUserFullName] = useState("");
  const [loginStatus, setLoginStatus] = useState();
  const [userTasks, setUserTasks] = useState([]);
  const [taskFindByUser, setTaskFindByUser] = useState("");
  const [displayTask, setDisplayTask] = useState(null);
  const [companyName, setCompanyName] = useState()
  // const [filterdTask, setFilterTask] = useState([]);
  const [allTasks, setAllTasks] = useState([])
  const [devBody, setDevBody] = useState(false)
  const [taskStatus, setTaskStatus] = useState("ALL")
  const [userPosition, setUserPosition] = useState(null)
  const [noTaskStmt, setNoTaskStmt] = useState(false);
  const [initials, setInitials] = useState()

  useEffect(() => {
    const getLoginStatus = localStorage.getItem("loginstatus");

    if (getLoginStatus !== null) {
      setLoginStatus(true);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    console.log(devBody)
    const profile = await getFullProfile();
    setUserFullName(profile.fullname)
    setAllTasks(profile.tasks)
    setUserTasks(profile.tasks)
    setCompanyName(profile.companyname);
    setUserPosition(profile.position)
    console.log("consoling", profile.companyname)
    if (profile.companyname == "aishsCreation") {
      setDevBody(true)
      console.log(devBody)
    }
    const getInitials = profile.fullname.split(" ").map(name => name[0]).join("");
    setInitials(getInitials)
  };

  const findHandle = (user) => {
    console.log("function clicked", user);
    console.log("taskfindbyuser", taskFindByUser)
    findTaskByUserService({ taskAssign: taskFindByUser })
  }

  const handleFlterTask = (status) => {
    if (status == 'all') {
      setUserTasks(allTasks)
      setTaskStatus("ALL")
    } else {
      const filterTask = allTasks.filter((tasks) => tasks.taskStatus === status);
      // setUserTasks(filterTask)
      if (filterTask.length >= 1) {
        setUserTasks(filterTask)
        setNoTaskStmt(false)
      } else {
        setNoTaskStmt(true)
        setUserTasks.length === 1
      }

      setTaskStatus(status)
    }
  }

  return (
    <>

      <section className=''>

        {
          displayTask && (
            <div className='fixed md:inset-20 flex items-center justify-center bg-black/0 inset-0 backdrop-blur-sm z-50 '>
              <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-[600px] flex flex-col border border-gray-500">
                <TasksCard task={displayTask} setDisplayTask={setDisplayTask} company={companyName}></TasksCard>
              </div>
            </div>
          )
        }

        <article className=''>
          {/* {loginStatus == true &&
            (
              //Name and profile
              <div className='md:flex justify-center gap-10 text-xl mb-3 text-center space-y-2 text-white md:p-3'>
              
                  <div className='md:hidden'><h1 className='border inline-block p-3 rounded-full bg-blue-700 text-white'>{initials}</h1></div>
                  <h1 className='md:text-2xl font-semibold'>Hello</h1>
                  <h1>{userFullName}</h1>
                  <h1 className=' md:text-2xl font-bold '>- {userPosition}</h1>
                </div>
             
            )} */}
          <article className='flex justify-center '>
            {
              loginStatus == true ?
                (
                  <>
                    {
                      userTasks.length <= 0 && devBody === false ?
                        (
                          <section className=' w-1/2 flex items-center justify-center font-bold'>
                            <article>
                              <h1 className='text-4xl'>You haven’t created any tasks yet...</h1>
                              <p>Start by creating a new task!</p>
                            </article>
                          </section>
                        ) : devBody === false ? (

                          <div>
                            <div className=''>
                              <div className='mb-3 text-xl font-semibold'>
                                <h1 className='flex justify-center mb-3 text-2xl font-semibold'>{taskStatus} Tasks  - {userTasks.length}</h1>
                                <ul className='w-full space-x-0.5 md:gap-6 justify-center flex '>
                                  {/* <li><h1 className='md:flex justify-center mb-3 text-2xl font-semibold hidden '>{taskStatus} Tasks  - {userTasks.length}</h1></li> */}
                                  <li className='filterbtn ' onClick={() => { handleFlterTask('all') }}>
                                    <i class="bi bi-ui-checks-grid"></i>
                                    <h1>All</h1>
                                  </li>
                                  <li className='filterbtn  filtodo' onClick={() => { handleFlterTask('ToDo') }}>
                                    <i class="bi bi-calendar2-plus"></i><h1>ToDo</h1>
                                  </li>
                                  <li className='filterbtn filinprogress' onClick={() => { handleFlterTask('InProgress') }}>
                                    <i class="bi bi-clock"></i><h1>InProgress</h1>
                                  </li>
                                  <li className='filterbtn filcomplete' onClick={() => { handleFlterTask('Completed') }}>
                                    <i class="bi bi-check-circle"></i><h1>Completed</h1>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            {
                              noTaskStmt === true ? (
                                <p className='flex justify-center text-2xl inprogress'>No tasks are in : {taskStatus}</p>
                              ) : (
                                <ul className='flex flex-wrap gap-5 mb-10 justify-center'>
                                  {
                                    userTasks.map((tasks) =>
                                    (
                                      <li className={`tasklist rounded-lg w-96 shadow-md ${tasks.taskStatus === "Completed" ? "complete" : tasks.taskStatus === "ToDo" ? "todo" : "inprogress"}`} >
                                        <div className='p-7' onClick={() => { setDisplayTask(tasks) }}>
                                          <p> {tasks.description}</p>
                                        </div>

                                      </li>
                                    ))
                                  }
                                </ul>
                              )
                            }
                          </div>
                        ) : (
                          <div>
                            <DevBody username={userFullName}  position={userPosition}></DevBody>
                          </div>
                        )
                    }
                  </>
                ) : (
                  <>
                    <section className=' w-1/2 flex items-center justify-center font-bold'>
                      <article className=''>
                        <h1 className='text-4xl'>Track, manage, and update your tasks easily from here</h1>
                        <p>Your task flow, simplified and organized in one place.</p>
                      </article>
                    </section>
                  </>
                )
            }
          </article>
        </article>


      </section>


    </>
  )
}
