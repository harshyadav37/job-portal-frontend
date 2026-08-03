import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { getAllCompanies ,postJob } from "../../../utlis/authApi";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState([]);
const[Loading,setLoading] = useState(false);
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getAllCompanies();
        if (res.success) {
          setCompanies(res.companies || []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCompanies();
  }, []);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleCompanyChange = (value) => {
    setInput({ ...input, companyId: value });
  };

  const selectedCompanyName = companies.find(
    (company) => company._id === input.companyId,
  )?.name;


  const submitHandler = async(e) => {
    e.preventDefault();

    const parsedSalary = Number(input.salary);
    const parsedExperience = Number(input.experience);
    const parsedPosition = Number(input.position);

    if (
      input.salary === "" ||
      input.experience === "" ||
      input.position === "" ||
      Number.isNaN(parsedSalary) ||
      Number.isNaN(parsedExperience) ||
      Number.isNaN(parsedPosition)
    ) {
      toast.error("Salary, experience, and position must be valid numbers");
      return;
    }

    try {
        setLoading(true);
        const res = await postJob({
          ...input,
          salary: parsedSalary,
          experience: parsedExperience,
          position: parsedPosition,
        });
        if(res.success){
            toast.success(res.message || "Job posted successfully");
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || error?.message || "Something went wrong");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <section className="flex items-center justify-center my-5 w-screen">
        <form onSubmit={submitHandler}  className="max-w-4xl p-8 border border-gray-300 rounded-md shadow-lg">
        <section className="grid grid-cols-2 gap-2">
          <div className="">
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.title}
              onChange={changeEventHandler}
            />
          </div>
          <div className="">
            <Label>Description</Label>
            <Input
              type="text"
              name="description"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.description}
              onChange={changeEventHandler}
            />
          </div>
          <div className="">
            <Label>Requirements</Label>
            <Input
              type="text"
              name="requirements"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.requirements}
              onChange={changeEventHandler}
            />
          </div>
          <div className="">
            <Label>Salary</Label>
            <Input
              type="number"
              name="salary"
              min="0"
              step="0.01"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.salary}
              onChange={changeEventHandler}
            />
          </div>
          <div className="">
            <Label>Location</Label>
            <Input
              type="text"
              name="location"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.location}
              onChange={changeEventHandler}
            />
          </div>
          <div className="">
            <Label>Job Type</Label>
            <Input
              type="text"
              name="jobType"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.jobType}
              onChange={changeEventHandler}
            />
          </div>
          <div className="">
            <Label>Experience Level</Label>
            <Input
              type="number"
              name="experience"
              min="0"
              step="1"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.experience}
              onChange={changeEventHandler}
            />
          </div>
          <div className="">
            <Label>Position</Label>
            <Input
              type="number"
              name="position"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              value={input.position}
              onChange={changeEventHandler}
            />
          </div>
          <div className="col-span-2">
            <Label>Select Company</Label>
            <Select value={input.companyId} onValueChange={handleCompanyChange}>
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Choose a company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies.map((company) => (
                    <SelectItem key={company._id} value={company._id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedCompanyName && (
              <p className="mt-2 text-sm text-gray-600">
                Selected company: <strong>{selectedCompanyName}</strong>
              </p>
            )}
          </div>
        </section>

      
        <Button type="submit" className='w-full mt-4' disabled={Loading}>
          {Loading ? "Posting..." : "Post New Job"}
        </Button>
        {companies.length === 0 && (
          <p className="text-red-500 flex items-center justify-center text-sm mt-2">
            Please create a company first
          </p>
        )}
        </form>
      </section>
    </div>
  );
};

export default PostJob;
