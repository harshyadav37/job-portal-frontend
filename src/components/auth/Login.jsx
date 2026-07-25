import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../utlis/authApi";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { Loader2 } from "lucide-react";
const Login = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const {loading} =useSelector(store=>store.auth);
        const [input , setInput]= useState({
        
          email:"",
          password:"",
        
          role:""
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
            const payload={
                 email: input.email,
                password: input.password,
                role: input.role,
            }

            const res =await loginUser(payload)
            if(res.success){
                toast.success(res.message);
                // localStorage.setItem("user", JSON.stringify(res.user));
                dispatch(setUser(res.user))
                navigate("/");
            } else {
                toast.error(res.message);
            }
          } catch (error) {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "Login failed");
          } finally{
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
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div className="flex flex-col gap-3">
            <Label>Email</Label>
            <Input type="email" value={input.email} name='email' onChange={changeEventHandler} placeholder="email" />
          </div>

          <div className="flex flex-col gap-3">
            <Label>Password</Label>
            <Input type="password" value={input.password} name='password' onChange={changeEventHandler} placeholder="password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-1">
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
                <Label htmlFor="option-two">Recuirter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full "><Loader2 className="mr-2 h-4 w-4 animate-spin">please wait</Loader2> </Button> :  <Button type="submit" className="w-full ">
            
            Login
          </Button>
          }
         
          <span className="text-sm">
            Do not have an account ?
            <Link className="text-blue-400" to="/Signup">
              
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
