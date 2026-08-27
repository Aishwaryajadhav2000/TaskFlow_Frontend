import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteClient, getClient } from '../services/company';

export default function CompanyDetails() {
  const { companyname } = useParams();
  const [totalTasks, setTotalTasks] = useState()
  const [totalUsers, setTotalUSers] = useState()

  useEffect(() => {
    // const getClientDetails = getClient(companyname);
    // console.log("details here",getClientDetails)

    const getCompanyDetails = async () => {
      try {
        const getClientDetails = await getClient(companyname)
        console.log("client details", getClientDetails)
        setTotalTasks(getClientDetails.details.tasks.length);
        setTotalUSers(getClientDetails.details.users.length)
      } catch (err) {

      }

    }

    getCompanyDetails()
  }, [companyname])



  const handleDelete = async () => {

    const deleteClientRes = await deleteClient(companyname);
    if (deleteClientRes.status === 200) {
      alert("Deleted")
    } else {
      console.log(deleteClientRes)
    }

  }
  return (
    <>
      <section className='bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 h-screen justify-center flex '>

        <article className='  md:mt-7  text-center w-[90%] md:w-[50%]  h-fit rounded-xl'>

          <div className='space-y-10 md:space-y-6 mt-4 bg-white  p-5'>
            <h1 className='text-2xl font-bold'>{companyname}</h1>
            <p className='text-xl'>Company Overview</p>
            <hr />
            
            <div className='md:flex space-y-10 space-x-10 justify-center gap-5 p-2'>
              <div className='flex md:inline-block space-y-5 space-x-5 text-2xl  p-2'>
                <i class="bi bi-card-checklist text-white border border-blue-600 bg-blue-700 rounded-full h-[50%] p-2"></i>
                <div className='md:mt-5'>
                  <h1>Total Tasks</h1>
                  <h1>{totalTasks}</h1>
                </div>
              </div>


              <div className='flex md:block space-x-5 text-2xl'>
                <i class="bi bi-people-fill text-white border border-pink-600 bg-pink-700 rounded-full h-[50%] p-2"></i>
                <div className='md:mt-5'>
                  <h1>Total USers</h1>
                  <h1>{totalUsers}</h1>
                </div>
              </div>
            </div>

            <div className='justify-center flex mt-5 '>
              <button onClick={handleDelete} className='space-x-3 flex bg-pink-600 text-white p-4 rounded-lg text-xl'>
                <i class="bi bi-trash3-fill "></i>
                <p>Delete Company</p>
              </button>
            </div>
          </div>



        </article>

      </section>
    </>


  )
}
