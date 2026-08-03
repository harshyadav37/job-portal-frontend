import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { getAllCompanies ,getAdminJobs } from "../../../utlis/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = ({ filterText = "" }) => {
  const [AdminJobs, setAdminJobs] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAdminJobs();
        if (res.success) {
            setAdminJobs(res.jobs || []);
            toast.success(res.message || "Jobs fetched successfully");
          }
        } catch (error) {
          console.log(error);
          toast.error(
            error.response?.data?.message ||
              error?.message ||
              "Something went wrong",
          );
        }
      };
      fetchJobs();
    }, []);

  const filteredJobs = (AdminJobs || []).filter((job) => {
    const searchText = (filterText || "").toLowerCase();
    const searchableText = [job.title, job.role, job.location, job.position]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchText);
  });

  const sortedJobs = [...filteredJobs].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );

  return (
    <div>
      <Table>
        <TableCaption> A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                No jobs found
              </TableCell>
            </TableRow>
          ) : (
            sortedJobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell>{job.title || "N/A"}</TableCell>
                <TableCell>{job.location || "N/A"}</TableCell>
                <TableCell>{job.updatedAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => navigate(`/admin/companies/${job._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
