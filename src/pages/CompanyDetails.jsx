import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { deleteClient, getClient } from '../services/company';

export default function CompanyDetails() {
  const { companyname } = useParams();

  useEffect(()=>{
    const getClientDetails = getClient(companyname);
    console.log(getClientDetails)
  })

  const handleDelete = async()=>{

    const deleteClientRes = await deleteClient(companyname);
    if(deleteClientRes.status === 200){
      alert("Deleted")
    }else{
      console.log(deleteClientRes)
    }

  }
  return (
    <>
      <div>{companyname}</div>

      <br />
      <div>
        <button onClick={handleDelete}>Delete Company</button>
      </div>
    </>


  )
}
