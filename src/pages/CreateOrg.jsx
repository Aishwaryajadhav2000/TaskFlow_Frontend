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
            <section className=' h-screen flex justify-center'>

                <article className='m-5'>
                    <div>
                        <h1>Create new Company data</h1>
                    </div>

                    <form action="" className='border w-3xl p-10' onSubmit={handleSubmit}>

                        <div className='flex'>
                            <label htmlFor="">Enter Company Name</label>
                            <input type="text" placeholder='Company name' onChange={(e) => setCompanyName(e.target.value)} />
                        </div>

                        <div className='flex mt-5'>
                            <label htmlFor="">Enter About Company</label>
                            <input type="text" placeholder='Description' onChange={(e) => setDescription(e.target.value)} />
                        </div>

                        <div className=' mt-5 flex justify-center'>
                            <button className='bg-amber-700 text-white font-semibold text-xl p-2 w-3xs rounded-2xl' type='submit'>
                                Create
                            </button>
                        </div>

                    </form>

                </article>
            </section>
        </>
    )
}
