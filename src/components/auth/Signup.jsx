import React from "react";
import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../utlis/authApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
const Signup = () => {
    const navigate= useNavigate()
    const dispatch = useDispatch();
    const {loading}= useSelector(store=>store.auth);
      const [input , setInput]= useState({
        fullName:"",
        email:"",
        password:"",
        phoneNumber:"",
        role:"",
        file:""
    });
    const  changeEventHandler=(e)=>{
        setInput({...input, [e.target.name]:e.target.value});
    }
    const changeFileHandler=(e)=>{
        setInput({
            ...input, file:e.target.files?.[0]
        });
    }

    const submitHandler =async (e)=>{
        e.preventDefault();
        try {
          dispatch(setLoading(true));
            const formData = new FormData();
            formData.append("fullName", input.fullName);
            formData.append("email", input.email);
            formData.append("password", input.password);
            formData.append("phoneNumber", input.phoneNumber);
            formData.append("role", input.role);
            if(input.file){
                formData.append("file", input.file);
            }

            const res = await registerUser(formData);
            console.log(res);

            if(res.success){
                toast.success(res.message);
                navigate("/login");
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            console.log(err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Signup failed");
        }finally{
                    dispatch(setLoading(false))
                  }
    }
  return (
    <div>
      <Navbar />
      <div className="flex item-center justify-center max-w-7xl mx-auto ">
        <form
          onSubmit={submitHandler}
          className="w-1/2 flex flex-col gap-4 border border-gray-200 rounded-md p-4  my-10"
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="flex flex-col gap-3">
            <Label>Full Name</Label>
            <Input type="text" value={input.fullName} onChange={changeEventHandler} name='fullName' placeholder="full name" />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Email</Label>
            <Input type="email" value={input.email} onChange={changeEventHandler} name='email' placeholder="email" />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Phone Number</Label>
            <Input type="text" value={input.phoneNumber} onChange={changeEventHandler} name='phoneNumber' placeholder="enter your number" />
          </div>
          <div className="flex flex-col gap-3">
            <Label>Password</Label>
            <Input type="password" value={input.password} onChange={changeEventHandler} name='password' placeholder="password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-one">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="option-two">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input accept="image/*"   type="file" 
                  onChange={changeFileHandler} className="cursor-pointer" />
            </div>
          </div>
           {
            loading ? <Button className="w-full "><Loader2 className="mr-2 h-4 w-4 animate-spin">please wait</Loader2> </Button> :  <Button type="submit" className="w-full ">
            
            SignUp
          </Button>
          }
          {/* <Button type="submit" className="w-full my-4">
            {" "}
            SignUp
          </Button> */}
          <span className="text-sm">
            Already have an account ?{" "}
            <Link className="text-blue-400" to="/login">
              {" "}
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
