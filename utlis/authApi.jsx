import axios from "axios";


const API = axios.create({
    baseURL:"http://localhost:8000/api",
    headers:{
         "Content-Type": "application/json",
    },
     withCredentials: true,
})

export const registerUser = async(userData)=>{
    const response = await API.post(`/user/register`, userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
}

export const loginUser =async(userData)=>{
    const response= await API.post(`/user/login`, userData)
    return response.data;
}

export const UpdateUser =async(userData)=>{
    const response =await API.put(`/user/update-profile`, userData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
  return response.data;
}
export const Logout = async () => {
  const response = await API.get("/user/logout");
  return response.data;
};

export const getAllJobs =async()=>{
    const response =await API.get("/job/get");
    return response.data;
}

export const getSingleJob = async (jobId) => {
    const response = await API.get(`/job/get/${jobId}`);
    return response.data;
}

export const applyJobApplication =async(jobId)=>{
    const response =await API.get(`/application/apply/${jobId}`);
    return response.data;
}

export const registerCompany =async(companyData)=>{
    const response= await API.post(`/company/register`,companyData);
    return response.data;
}
  
export const updateCompany =async(companyId,companyData)=>{
    const response= await API.put(`/company/update/${companyId}`,companyData, {
        headers: {
            'Content-Type': undefined,
        },
    });
    return response.data;
}

export const getSingleCompany = async (companyId) => {
    const response = await API.get(`/company/get/${companyId}`);
    return response.data;
};


export const getAllCompanies = async () => {
    const response = await API.get("/company/get");
    return response.data;
}