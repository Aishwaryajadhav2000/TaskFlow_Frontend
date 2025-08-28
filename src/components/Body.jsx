import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import '../App.css'
import { getFullProfile } from '../services/auth.js';

export default function Body() {
  const [userFullName, setUserFullName] = useState("");
  const [loginStatus, setLoginStatus] = useState();
  const [userTasks , setUserTasks] = useState("")

  useEffect(() => {

    getFullProfile();

    const getLoginStatus = localStorage.getItem("loginstatus");
    if (getLoginStatus !== null) {
      setLoginStatus(true);
    }
    const getUserData = JSON.parse(localStorage.getItem("user"));
    console.log("getuserdata", getUserData)
    if (getUserData !== null) {
      setUserFullName(getUserData.fullname)
      setUserTasks(getUserData.tasks)
    }
  } , []);





  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <h1>Body</h1>
      <section>
        {loginStatus == true && (
          <div className='flex justify-center h-10 text-xl'>
            <h1>Hello {userFullName}</h1>
          </div>
        )}
        <article className='flex justify-center  h-96'>
          {
            loginStatus == true ? (
              <Slider {...settings} className='w-7xl border bg-blue-950 text-white text-4xl'>
                {
                  userTasks.length <= 0 ? (
                    <div className='p-10'>
                      Create new tasks here
                    </div>
                  ) : (
                    <div className='p-10'>
                      Tasks created will show here
                    </div>
                  )
                }
              </Slider>
            ) : (
              <Slider {...settings} className='w-7xl border bg-blue-950 text-white text-4xl'>
                <div className='p-10'>
                  <h1>Start your day with a clear plan — add your tasks now!</h1>
                </div>

                <div className='p-10'>
                  <h1>A little progress each day adds up to big success.</h1>
                </div>

                <div className='p-10'>
                  <h1>Consistency beats motivation. Keep going!</h1>
                </div>
              </Slider>
            )
          }
        </article>
      </section>
    </>
  )
}
