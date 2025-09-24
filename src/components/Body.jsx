import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import '../App.css'
import { getFullProfile } from '../services/auth';
import TasksCard from './TasksCard.jsx';
import { findTaskByUserService } from '../services/tasks.js';
import { useLocation } from 'react-router-dom';
import { getUsersByCompany } from '../services/company.js';

export default function Body() {
  const [userFullName, setUserFullName] = useState("");
  const [loginStatus, setLoginStatus] = useState();
  const [userTasks, setUserTasks] = useState([]);
  const [taskFindByUser, setTaskFindByUser] = useState("");
  const [displayTask, setDisplayTask] = useState(null);
  const [companyName, setCompanyName] = useState()

  useEffect(() => {
    const getLoginStatus = localStorage.getItem("loginstatus");

    if (getLoginStatus !== null) {
      setLoginStatus(true);

      const fetchUser = async () => {
        const profile = await getFullProfile(); 
        setUserFullName(profile.fullname)
        setUserTasks(profile.tasks)
        setCompanyName(profile.companyname);
        console.log("consoling", profile.companyname)
      };
      fetchUser();
    }


  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const findHandle = (user) => {
    console.log("function clicked", user);
    console.log("taskfindbyuser", taskFindByUser)
    findTaskByUserService({ taskAssign: taskFindByUser })
  }

  return (
    <>
      {userFullName === "aishwarya jadhav" ? (
        <section>
          {loginStatus == true && (
            <div className='flex justify-center h-10 text-xl mb-10'>
              <h1 className='mt-5 text-3xl font-semibold'>Hello {userFullName}</h1>
            </div>
          )}
        </section>
      ) :
        <section>

          {
            displayTask && (
              <div className='fixed inset-20 flex items-center justify-center bg-black/0 backdrop-blur-sm z-50'>
                <div className="bg-white rounded-xl shadow-lg p-6 w-[600px] max-w-[90%] h-[90%] flex flex-col">
                  <TasksCard task={displayTask} setDisplayTask={setDisplayTask} company={companyName}></TasksCard>
                </div>
              </div>
            )
          }

          {loginStatus == true && (
            <div className='flex justify-center h-10 text-xl mb-10'>
              <h1 className='mt-5 text-3xl font-semibold'>Hello {userFullName}</h1>
            </div>
          )}
          <article className='flex justify-center'>
            {
              loginStatus == true ? (
                <>
                  {
                    userTasks.length <= 0 ? (
                      <section className=' w-1/2 flex items-center justify-center font-bold'>
                        <article>
                          <h1 className='text-4xl'>You haven’t created any tasks yet...</h1>
                          <p>Start by creating a new task!</p>
                        </article>
                      </section>
                    ) : (
                      // <TasksCard tasks={userTasks}></TasksCard>
                      <div className='p-5'>
                        <div className='m-2.5 min-w-fit'>
                          <h1 className='flex justify-center mb-5 text-2xl font-semibold'>Total Tasks  - {userTasks.length}</h1>
                          {/* <div className='mt-5'>
                          <select name="" id="" onChange={(e) => {setTaskFindByUser(e.target.value); findHandle(e.target.value)}}>
                            <option value="aish" onClick={findHandle()}>Aish</option>
                            <option value="mayur">mayur</option>
                          </select>
                        </div> */}
                        </div>
                        <ul className='flex flex-wrap gap-5  justify-center'>

                          {userTasks.map((tasks) => (

                            <li className={`tasklist rounded-lg w-96 shadow-md ${tasks.taskStatus === "Completed" ? "complete" : tasks.taskStatus === "ToDo" ? "todo" : "inprogress"}`} >
                              <div className='p-7' onClick={() => { setDisplayTask(tasks) }}>
                                <p> {tasks.description}</p>
                              </div>
                              {/* <TasksCard tasks={tasks} index={tasks._id}></TasksCard> */}
                            </li>

                          ))}



                        </ul>
                      </div>
                    )
                  }
                </>
              ) : (
                // <Slider {...settings} className='w-7xl border bg-blue-950 text-white text-4xl'>
                //   <div className='p-10'>
                //     <h1>Start your day with a clear plan — add your tasks now!</h1>
                //   </div>

                //   <div className='p-10'>
                //     <h1>A little progress each day adds up to big success.</h1>
                //   </div>

                //   <div className='p-10'>
                //     <h1>Consistency beats motivation. Keep going!</h1>
                //   </div>
                // </Slider>
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
        </section>
      }



    </>
  )
}
