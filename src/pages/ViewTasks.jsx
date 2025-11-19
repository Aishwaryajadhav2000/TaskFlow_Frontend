import React, { useEffect } from 'react'
import { findTaskByCompany } from '../services/tasks.js'
import { useLocation } from 'react-router-dom';

export default function ViewTasks() {

const location = useLocation()
const companyname = location.state?.companyName;

  useEffect(()=>{
    console.log(companyname)
    getTask()
  } , [companyname])

  const getTask = async()=>{
    const gettaskdata = await findTaskByCompany(companyname);
    console.log("gettask" , gettaskdata)
  }

  return (
    <>
      


    </>
  )
}
