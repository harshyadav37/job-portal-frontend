import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
    const isApplied =true;
  return (
    <div className="max-w-7xl mx-auto my-10">
        <section className="flex items-center justify-between">

      
        <section>
 <h1 className="font-bold text-xl">Frontend Developer</h1>
      <div className="flex flex-wrap items-center  gap-2 mt-4">
        <Badge className="text-blue-700 border border-gray font-bold" variant="ghost"> 12 Positions  </Badge>
        <Badge className="text-[#F83002] border border-gray  font-bold" variant="ghost"> Part Time</Badge>
        <Badge className="text-[#7209b7] border border-gray  font-bold" variant="ghost"> 24LPA</Badge>
      </div>
        </section>
     
      <Button disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' :'bg-[#7209b7] hover:bg-[#5f32ad]'}`}>{ isApplied ? 'Already Applied' : 'Apply Now'}</Button>
        </section>
        <h1 className="border-b-2 border-b-gray-300 py-4 font-medium">Job Description</h1>
        <section className="my-4">
            <h1 className="font-bold my-1">Role: <span className="pl-4 font-normal text-gray-800">Frontend Developer</span></h1>
             <h1 className="font-bold my-1">Location: <span className="pl-4 font-normal text-gray-800">Hyderabad</span></h1>
              <h1 className="font-bold my-1">Description: <span className="pl-4 font-normal text-gray-800">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span></h1>
               <h1 className="font-bold my-1">Experience: <span className="pl-4 font-normal text-gray-800">2 yrs</span></h1>
                <h1 className="font-bold my-1">Salary: <span className="pl-4 font-normal text-gray-800">12LPA </span></h1>
                 
                 <h1 className="font-bold my-1">Total Applicants: <span className="pl-4 font-normal text-gray-800"> 4</span></h1>
                 <h1 className="font-bold my-1">Posted Date: <span className="pl-4 font-normal text-gray-800"> 01-01-2005</span></h1>


        </section>
    </div>
  );
};

export default JobDescription;
