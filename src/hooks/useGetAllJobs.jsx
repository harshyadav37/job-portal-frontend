import React, { useEffect } from 'react'
import { getAllJobs } from '../../utlis/authApi'
import { useDispatch } from 'react-redux'
import { setAllJobs } from '@/redux/jobSlice'
const useGetAllJobs = () => {
      const dispatch = useDispatch();
    useEffect(()=>{
         
        const fetchAllJobs =async () =>{
         
            try {
                const res =await getAllJobs();
                if(res.success){
                    dispatch(setAllJobs(res.jobs))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[])
//   return (
//     <div>useGetAllJobs</div>
//   )
}

export default useGetAllJobs