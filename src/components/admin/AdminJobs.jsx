import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import AdminJobsTable from './AdminJobsTable'

const AdminJobs = () => {
    const navigate=useNavigate();
    const [input , setInput] = useState("");
  return (
    <div>
        <Navbar/>
        <section className='max-w-6xl mx-auto my-10'>
            <div className='flex items-center justify-between my-5'>
 <Input 
            className='w-fit'
            placeholder="Filter by name"
            value={input}
            onChange={(e) => setInput(e.target.value)}
        />
            <Button onClick={()=>navigate("/admin/jobs/post")}>New Jobs</Button>
            </div>
           
        <AdminJobsTable filterText={input} />
        </section>
    </div>
  )
}

export default AdminJobs