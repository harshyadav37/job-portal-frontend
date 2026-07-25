import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";


const Skills= ["HTML","CSS","JavaScript" , "Nextjs"]
const Profile = () => {
    const [open ,setOpen]=useState(false);
    const isResume=true;
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">

        
        <div className="flex items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGh7JTkSOo6HC8NsMiIUs8H7fQUtjMbpHShnwfkm-TeFGF2MKuq-9v-ZhD&s=10"
              alt="profile"
            />
          </Avatar>
          <div>
            <h1 className="font-medium text-xl">Full Name</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio,
              porro.
            </p>
          </div>
         
        </div>
         <Button onClick={()=>setOpen(true)}  className='text-right ' variant="outline"> <Pen/> </Button>
      </div>
      <div className="my-5">
        <div className="flex items-center gap-3 my-2">
              <Mail/>
        <span>
            harsh@gmail.com
        </span>
        </div>
         <div className="flex items-center gap-3 my-2">
             <Contact/>
        <span>1234567899</span>
         </div>
       
      </div>
      <div className="my-5">
        <h1>Skills</h1>
        <div className="flex items-center gap-1">
             {
            Skills.length !==0 && Skills.map((item,index)=><Badge key={index}>{item}</Badge>)
        }
        </div>
       
      </div>
      <div className="grid w-full max-w-sm itmes-center gap-1.5">
        <Label className='text-md font-bold'> Resume</Label>
       {
        isResume? <a target="blank" href="https://github.com/harshyadav37" className="text-blue-500 w-full hover:underline cursor-pointer">hello dude</a> :<span>NA</span>
       }

      </div>
      
      </div>
      <section className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
         {/* application Applied Jobs */}
         <AppliedJobTable/>
      </section>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
