import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { UpdateUser } from "../../utlis/authApi";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading ,setLoading]= useState(false);
    const {user} =useSelector(store=>store.auth);
    const [input , setInput]=useState({
      fullName:user?.fullName || "",
      email:user?.email || "",
      phoneNumber:user?.phoneNumber || "",
      bio:user?.profile?.bio || "",
      skills: user?.profile?.skills?.join(", ") || "",
      file:null
    })

useEffect(() => {
  setInput({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null,
  });
}, [user]);

const changeEventHandler =(e)=>{
  const { name, value } = e.target;
  setInput((prev) => ({ ...prev, [name]: value }));
}
const fileChangeHandler=(e)=>{
  const file=e.target.files?.[0];
  setInput((prev) => ({ ...prev, file }));
}
const dispatch =useDispatch()
const submitHandler =async(e)=>{
  e.preventDefault();
  setLoading(true);
    const formData = new FormData();
            formData.append("fullName", input.fullName || "");
            formData.append("email", input.email || "");
            formData.append("phoneNumber", input.phoneNumber || "");
            formData.append("bio", input.bio || "");
            formData.append("skills", input.skills || "");
            if(input.file){
              formData.append("file",input.file)
            }
            try {
              setLoading(true);
              const res =await UpdateUser(formData);

                if(res.success){
             dispatch(setUser(res.user));
             toast.success(res.message)
            } else {
                toast.error(res.message);
            }
        
            } catch (error) {
              console.log(error);
              toast.error(error.response?.data?.message || "Profile update failed")
            } finally {
              setLoading(false);
              setOpen(false)
            }
}
  return (
    <div>
      {/* update profile */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[425px] ' onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <section className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input id="name" onChange={changeEventHandler} name="fullName" value={input.fullName} className="col-span-3" />
              </section>
               <section className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">Email</Label>
                <Input id="email" onChange={changeEventHandler} name="email" value={input.email} className="col-span-3" />
              </section>
               <section className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">Number</Label>
                <Input id="number" onChange={changeEventHandler}  value={input.phoneNumber} name="phoneNumber" className="col-span-3" />
              </section>
               <section className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">Bio</Label>
                <Input id="bio" onChange={changeEventHandler} value={input.bio}  name="bio" className="col-span-3" />
              </section>
                           <section className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">Skills</Label>
                <Input id="skills" onChange={changeEventHandler} value={input.skills}  name="skills" className="col-span-3" />
              </section>
                             <section className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">Resume</Label>
                <Input id="file" onChange={fileChangeHandler} name="file" type="file" accept="application/pdf" className="col-span-3" />
              </section>
            </div>
            <DialogFooter>
          {
            loading ? <Button className="w-full "><Loader2 className="mr-2 h-4 w-4 animate-spin">please wait</Loader2> </Button> :  <Button type="submit" className="w-full ">
            
            Update
          </Button>
          }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
