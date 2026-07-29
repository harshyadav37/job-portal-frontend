import React, { useEffect, useState } from "react";
import LatestJobCards from "./LatestJobCards";
import { getAllJobs } from "../../utlis/authApi";

const LatestJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await getAllJobs();
        console.log(res); // Check what your API returns

        if (res.success) {
          setJobs(res.jobs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
        {jobs.length === 0 ? (
          <span>No Job Available</span>
        ) : (
          jobs.map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;