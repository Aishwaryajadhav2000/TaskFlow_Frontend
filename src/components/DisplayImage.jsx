import { X } from 'lucide-react'
import React from 'react'
import API_BASE_URL from '../services/common'

export default function DisplayImage({ image , display}) {
    return (
        <section className='w-full h-full overflow-y-auto'>
           <article className=''>
                              <div className='flex justify-end' onClick={(e) => display(null)}><X></X></div>
                          </article>
            <div>
                <img src={`${API_BASE_URL}/${image}`}
                    alt="taskimage"
                />
            </div>
        </section>
    )
}
