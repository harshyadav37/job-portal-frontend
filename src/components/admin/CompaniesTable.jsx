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
import { getAllCompanies } from "../../../utlis/authApi";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CompaniesTable = ({ filterText = "" }) => {
  const [companies, setCompanies] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getAllCompanies();
        if (res.success) {
          setCompanies(res.companies);
          toast.success(res.message || "Companies fetched successfully");
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
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(filterText.toLowerCase()),
  );

  const sortedCompanies = [...filteredCompanies].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
  );
  return (
    <div>
      <Table>
        <TableCaption> A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedCompanies.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            sortedCompanies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={
                        company.logo ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGh7JTkSOo6HC8NsMiIUs8H7fQUtjMbpHShnwfkm-TeFGF2MKuq-9v-ZhD&s=10"
                      }
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.updatedAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
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

export default CompaniesTable;
