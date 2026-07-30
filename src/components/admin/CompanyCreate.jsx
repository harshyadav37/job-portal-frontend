import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { registerCompany } from '../../../utlis/authApi'
import { toast } from 'sonner'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const { user } = useSelector((store) => store.auth);
    const [company, setCompany] = useState({ companyName: "" });

    useEffect(() => {
        if (!user || user.role !== 'recruiter') {
            navigate('/login');
        }
    }, [user, navigate]);

    const registerNewCompany = async () => {
        try {
            const res = await registerCompany(company);
            if (res.success) {
                const companyId = res?.data?.company?._id || res?.company?._id;
                toast.success(res?.data?.message || res?.message || "Company registered successfully");
                setCompany({ companyName: "" });
                if (companyId) {
                    navigate(`/admin/companies/create/${companyId}`);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
        }
    };

    return (
        <div>
            <Navbar />
            <section className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p>What would you like to give your company name? you can change this later</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type='text'
                    className='my-2'
                    placeholder='jobHunt, MicroSoft etc.'
                    value={company.companyName}
                    onChange={(e) => setCompany({ companyName: e.target.value })}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant='outline' onClick={() => navigate('/admin/companies')}>
                        Cancel
                    </Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </section>
        </div>
    )
}

export default CompanyCreate