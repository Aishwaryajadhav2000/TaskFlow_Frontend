import React from 'react'
import { useParams } from 'react-router-dom'

export default function CompanyDetails() {
    const {companyname} = useParams();

  return (
    <div>{companyname}</div>
  )
}
