import React from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-white border-gray-200 rounded-2xl my-5 p-8">
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
      </div>
    </div>
  );
};

export default Profile;
