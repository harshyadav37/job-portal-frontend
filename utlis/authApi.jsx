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