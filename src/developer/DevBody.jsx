import React, { useEffect, useState } from 'react'
import { getCompaniesList } from '../services/company'
import { useNavigate } from 'react-router-dom'

export default function DevBody({ username, position }) {

  const [companyList, setCompanyList] = useState([])
  const navigate = useNavigate()
  const [totalCompanies, setTotalCompanies] = useState()
  const [initials, setInitials] = useState()


  useEffect(() => {
    const getDataFunction = async () => {

      const getCompanies = await getCompaniesList();
      const resData = await getCompanies.json();
      setCompanyList(resData.companies)
      setTotalCompanies(resData.companies.length)
    }

    getDataFunction();

    const getInitials = username.split(" ").map(name => name[0]).join("");
    setInitials(getInitials)

  })

  return (
    <>
      <section className='bg-gradient-to-r min-h-screen from-blue-700 via-indigo-600 to-purple-600'>
        <div className='md:grid grid-cols-2 justify-center gap-10 text-xl mb-3 text-center space-y-2 text-white md:p-3 mx-3 mt-5'>

          <div className='space-y-2'>
            <div className='md:flex md:text-2xl space-x-3 font-semibold'>
              <div className='md:hidden'><h1 className='border inline-block p-3 rounded-full bg-blue-700 text-white'>{initials}</h1></div>
              <h1 className=''>Hello</h1>
              <h1>{username}</h1>
              <h1 className=' md:text-2xl font-bold '> : {position}</h1>
            </div>
            <p className='hidden md:flex'>Welcome Back! Manage Your Companies From Here .</p>
          </div>

          <div className='hidden md:grid grid-cols-2 border border-gray-300 p-2'>

            <div className=' border-r-2'>
              <h1>Total Companies</h1>
              <h1>{totalCompanies}</h1>
            </div>

            <div><h1>Total Users</h1></div>
          </div>

        </div>

        <section className='md:grid-cols-3 md:grid md:gap-5 md:bg-white rounded-xl md:py-5 md:mx-4'>
          {
            companyList.map((data) => (
              <article className='rounded-2xl border-blue-800 border-l-4 flex justify-between bg-gray-200 p-7 md:p-14 md:px-30 gap-5  text-center m-5' key={data._id}
                onClick={() => navigate(`/${data.companyname}`)}>
                <h1>{data.companyname}</h1>
                <i class="bi bi-arrow-right-circle text-2xl text-blue-700"></i>

              </article>
            ))
          }
        </section>
      </section>

    </>
  )
}
