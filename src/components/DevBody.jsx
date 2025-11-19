import React, { useEffect, useState } from 'react'
import { getCompaniesList } from '../services/company'
import { useNavigate } from 'react-router-dom'

export default function DevBody() {

  const [companyList, setCompanyList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const getDataFunction = async () => {

      const getCompanies = await getCompaniesList();
      const resData = await getCompanies.json();
      setCompanyList(resData.companies)
    }

    getDataFunction();

  })

  return (
    <>
      <section className='grid-cols-2 grid gap-5'>
        {
          companyList.map((data)=>(
            <article className='border border-black p-14 pr-40 pl-40' key={data._id}
              onClick={()=>navigate(`/${data.companyname}`)}>
              <h1>{data.companyname}</h1>
            </article>
          ))
        }
      </section>
    </>
  )
}
