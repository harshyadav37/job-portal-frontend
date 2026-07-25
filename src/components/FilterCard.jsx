import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Delhi NCR",
      "Indore",
      "Mumbai",
      "GuruGram",
      "Pune",
      "Noida",
      "Bangalore",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "MernStack Developer",
      "FullStack Developer",
      "Data Science",
      "AI Expert",
      "Python Developer",
    ],
  },
  {
    filterType: "Salary",
    array: [
      "0-50k",
      "40-90k",
      "60-1lakh",
      "80-3lakh",
      "1-5lakh",
      "3-8lakh",
      "5-10lakh",
    ],
  },
];
const FilterCard = () => {
  return (
    <div className="w-full bg-white p-3 rounded-md ">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {filterData.map((data, index) => (
          <div className="mt-3">
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, index) => {
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} />
                  <Label>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
