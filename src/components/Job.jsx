import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <section className="flex justify-between items-center">
        <p className="text-sm text-gray-500">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />{" "}
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
          <h1 className="font-medium text-lg">Company Name</h1>
          <p className="text-sm text-gray-500">India</p>
        </div>{" "}
      </section>

      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-600 ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et soluta
          corrupti modi quidem dolor expedita libero quibusdam voluptas earum
          ex?
        </p>
      </div>
      <div className="flex flex-wrap items-center  gap-2 mt-4">
        <Badge
          className="text-blue-700 border border-gray font-bold"
          variant="ghost"
        >
          12 Positions
        </Badge>
        <Badge
          className="text-[#F83002] border border-gray  font-bold"
          variant="ghost"
        >
          Part Time
        </Badge>
        <Badge
          className="text-[#7209b7] border border-gray  font-bold"
          variant="ghost"
        >
          24LPA
        </Badge>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#7209b7] text-white " variant="outline">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
