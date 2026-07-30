import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { updateCompany } from '../../../utlis/authApi'
import { toast } from 'sonner'
import { useParams, useNavigate } from 'react-router-dom'

const CompanySetup = () => {
    const [input , setInput] = useState({
        name:"",
        description:"",
        website:"",
        location:"",
        file:null
    });
    const params = useParams();
    const[loading , setLoading] = useState(false);
    const changeEventHandler=(e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    const changeFileHandler=(e)=>{
        const file = e.target.files?.[0];
        setInput({
            ...input,
            file
        })
    }
  const navigate = useNavigate();
    const submitHandler=async (e)=>{
        e.preventDefault();
        setLoading(true);
        console.log(input);
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
       
        if(input.file){
            formData.append("file", input.file);
        }
        try{
            const res = await updateCompany(params.id, formData);
            if(res.success){
                toast.success(res.message || "Company updated successfully");
                navigate("/admin/companies");
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.response?.data?.message || error?.message || "Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-xl mx-auto my-10'>
            <form onSubmit={submitHandler}>
                <div className='flex items-center gap-5 p-8'>
                      <Button onClick={() => navigate("/admin/companies")} variant='outline' className='flex items-center gap-2 text-gray-600 font-semibold'>
                    <ArrowLeft/>
                    <span>Back

                    </span>
                </Button>
                <h1 className='text-xl font-bold '>Company Setup</h1>

                </div>
                <section className='grid grid-cols-2 gap-4'>
                    <div>
                     <Label>Company Name</Label>
                <Input
                    type='text'
                    name='name'
                    value={input.name}
                    onChange={changeEventHandler}
                />
                    </div>
                      <div>
                     <Label>Description</Label>
                <Input
                    type='text'
                    name='description'
                    value={input.description}
                    onChange={changeEventHandler}
                />
                    </div>
                      <div>
                     <Label>Website</Label>
                <Input
                    type='text'
                    name='website'
                    value={input.website}
                    onChange={changeEventHandler}
                />
                    </div>
                      <div>
                     <Label>Location</Label>
                <Input
                    type='text'
                    name='location'
                    value={input.location}
                    onChange={changeEventHandler}
                />
                    </div>
                        <div>
                     <Label>Logo</Label>
                <Input
                    type='file'
                    accept='image/*'
                   
                    onChange={changeFileHandler}
                
        />
                    </div>


                </section>
               
              <Button type='submit' className="w-full mt-8" disabled={loading}>
                {loading ? "Updating..." : "Update"}
              </Button>
            </form>

        </div>
    </div>
  )
}

export default CompanySetup