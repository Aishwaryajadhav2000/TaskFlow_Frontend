import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import '../App.css'
import { getFullProfile } from '../services/auth';
import TasksCard from './TasksCard.jsx';

export default function Body() {
  const [userFullName, setUserFullName] = useState("");
  const [loginStatus, setLoginStatus] = useState();
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const getLoginStatus = localStorage.getItem("loginstatus");
    if (getLoginStatus !== null) {
      setLoginStatus(true);

      const fetchUser = async () => {
        const profile = await getFullProfile(); // 👈 call service
        setUserFullName(profile.fullname)
        setUserTasks(profile.tasks)
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

  return (
    <>
      <section>
        {loginStatus == true && (
          <div className='flex justify-center h-10 text-xl'>
            <h1 className='mt-5 text-3xl font-semibold'>Hello {userFullName}</h1>
          </div>
        )}
        <article className='flex justify-center h-96'>
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
                    <TasksCard tasks={userTasks}></TasksCard>
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
    </>
  )
}
