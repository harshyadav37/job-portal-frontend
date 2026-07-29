import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate =useNavigate();
  // const jobId='hbljhb';
  if(!job)return null;

  const daysAgoFunction=(mongodbTime)=>{
    const createdAt =new Date(mongodbTime);
    const currentTime= new Date();
    const timeDifference=currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60))
  }
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <section className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) ===0 ? "Today" :`${daysAgoFunction(job?.createdAt)} days ago`} </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </section>

      <section className="flex gap-2">
        <div className="flex items-center gap-2 my-2">
          <Button variant="outline" size="icon" className="p-6">
            <Avatar>
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGh7JTkSOo6HC8NsMiIUs8H7fQUtjMbpHShnwfkm-TeFGF2MKuq-9v-ZhD&s=10" />
            </Avatar>
          </Button>
        </div>
        <div className="mt-2">
          <h1 className="font-medium text-lg">{job.company?.name}</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </section>

      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-600 ">
         {job.description}
        </p>
      </div>
      <div className="flex flex-wrap items-center  gap-2 mt-4">
        <Badge
          className="text-blue-700 border border-gray font-bold"
          variant="ghost"
        >{job.position}        </Badge>
        <Badge
          className="text-[#F83002] border border-gray  font-bold"
          variant="ghost"
        >
          {job.jobType}
        </Badge>
        <Badge
          className="text-[#7209b7] border border-gray  font-bold"
          variant="ghost"
        >
          {job.salary}LPA
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button  onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#7209b7] text-white " variant="outline">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
