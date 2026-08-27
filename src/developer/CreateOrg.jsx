
import React, { useState } from 'react'
import { createNewOrg } from '../services/company';
import { useNavigate } from 'react-router-dom';

export default function CreateOrg() {

    const [companyName, setCompanyName] = useState("");
    const [description, setDescription] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();

        const data = { companyName, description };
        try {
            const createRes = await createNewOrg(data);
            const datares = await createRes.json();
            if(createRes.status === 200){
                navigate('/')
            }
            
            if (createRes.status === 500) {
                alert(datares.message)
            }
        }catch(err){
            alert(err.message)
        }

      }

    return (
        <>
            <section className='text-white h-screen pt-3 justify-center bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600'>

                
                <article className='m-5 md:mx-[10%] md:grid grid-cols-2 p-5 border rounded-xl'>
                    <div className='p-5 text-center justify-center '>
                        <i class="bi bi-buildings border p-2 px-3 rounded-full bg-blue-700 text-3xl md:text-7xl"></i>
                        <h1 className='text-xl mt-5'>Create new Company</h1><br />
                        <p>Add Company Details And Get Started</p>
                    </div><hr className='md:hidden'/>

                    <form action="" className='md:p-10 py-5' onSubmit={handleSubmit}>

                        <div className='space-y-3'>
                            <h1 className='' htmlFor="">Company Name</h1>
                            <input type="text" placeholder='Enter Company name' onChange={(e) => setCompanyName(e.target.value)} className='w-full h-14 px-4 border border-gray-300 rounded-md'/>
                        </div>

                        <div className='mt-5 space-y-3'>
                            <h1 htmlFor="">About Company</h1>
                            <textarea type="text" placeholder='Enter About Company' onChange={(e) => setDescription(e.target.value)} className='w-full h-20 px-4 border border-gray-300 rounded-md'/>
                        </div>

                        <div className=' mt-5 flex justify-center'>
                            <button className='bg-white text-blue-700 font-semibold text-xl p-2 w-3xs rounded-xl' type='submit'>
                                Create Company
                            </button>
                        </div>

                    </form>

                </article>
            </section>
        </>
    )
}
