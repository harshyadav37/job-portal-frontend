import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Logout } from "../../../utlis/authApi";
import { setUser } from "@/redux/authSlice";
const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch =useDispatch();
  const navigate =useNavigate();
  const logoutHandler =async()=>{
    try {
      const res = await Logout();
      if(res.success){
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message || "Logout failed");
    }
  }
  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mx-auto max-w-7xl h-16 ">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-blue-500">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex gap-5 font-medium ">
            <li>
              <Link to="/">Home</Link>{" "}
            </li>
            <li>
              {" "}
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              {" "}
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline"> Login</Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-red-300 hover:bg-red-500 "
                  variant="outline"
                >
                  SignUp
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80  ">
                <div className=" flex gap-3">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h3 className="font-medium">Harsh yadav</h3>
                    <p className="text-sm text-muted-foreground">
                      Lorem Possimus laudantium libero eos mm
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      {" "}
                      <Link to="/profile">View Profile</Link>{" "}
                    </Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
