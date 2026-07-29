import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { getSingleJob ,applyJobApplication} from "../../utlis/authApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import { toast } from "sonner";

const JobDescription = () => {
    

    const params = useParams();
    const jobId = params.id;
    const { user } = useSelector((store) => store.auth);
    const [job, setJob] = useState(null);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
      const fetchSingleJob = async () => {
        try {
          const res = await getSingleJob(jobId);
          if (res.success) {
            setJob(res.job);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchSingleJob();
    }, [jobId]);

    useEffect(() => {
      if (!job || !user) {
        setIsApplied(false);
        return;
      }
      const applied = Array.isArray(job.applications) && job.applications.some((application) => {
        const applicantId = typeof application.applicant === "string" ? application.applicant : application.applicant?._id;
        return applicantId === user._id;
      });
      setIsApplied(applied);
    }, [job, user]);

const applyJobHandler =async ()=>{
  try {
    const res  = await applyJobApplication(jobId);
    if(res.success){
      setIsApplied(true);
      setJob((prevJob) => ({
        ...prevJob,
        applications: [
          ...(prevJob?.applications || []),
          { applicant: user?._id },
        ],
      }));
      toast.success(res.message || res.data?.message || "Applied successfully");
    }
  } catch (error) {
    console.log (error);
    toast.error(error.response?.data?.message || error.message || "Application failed");
  }
}
  return (
    <div className="max-w-7xl mx-auto my-10">
        {!job ? (
          <span>Loading job details...</span>
        ) : (
          <div key={job._id}>
  <section className="flex items-center justify-between">
      
      
        <section>
 <h1 className="font-bold text-xl">{job?.title}</h1>
      <div className="flex flex-wrap items-center  gap-2 mt-4">
        <Badge className="text-blue-700 border border-gray font-bold" variant="ghost"> {job?.position}  </Badge>
        <Badge className="text-[#F83002] border border-gray  font-bold" variant="ghost"> {job?.jobType}</Badge>
        <Badge className="text-[#7209b7] border border-gray  font-bold" variant="ghost"> {job?.salary}LPA</Badge>
      </div>
        </section>
     
      <Button onClick={isApplied  ? null : applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' :'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{ isApplied ? 'Already Applied' : 'Apply Now'}</Button>
        </section>

          <h1 className="border-b-2 border-b-gray-300 py-4 font-medium">Job Description</h1>
        <section className="my-4">
            <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">{job?.title}</span></h1>
             <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">{job?.location}</span></h1>
              <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">{job?.description}</span></h1>
               <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">{job?.experience}yrs</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">{job?.salary}LPA </span></h1>
                 
                 <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800"> {job?.applications?.length}</span></h1>
                 <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800">{job?.createdAt.split("T")[0]} </span></h1>


        </section>

          </div>
          // </div>
        )}
      </div>
    );
};

export default JobDescription;
