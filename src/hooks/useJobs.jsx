import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const useJobs = () => {
    const [loading,setLoading]=useState(false)
    const { authToken } = useContext(AuthContext);
    const handleSubmit = async ({e,setFormData,formData}) => {
        e.preventDefault();
        setLoading(true)
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        console.log(formData)
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_BACKEND_URI}/api/jobs`,
            formData,
            { headers }
          );
          if (response.status === 200) toast.success("Job added successfully");
          setFormData({
            jobTitle: "",
            jobDescription: "",
            experienceLevel: "",
            candidates: [],
            newMail: "",
            endDate: "",
          });
          setLoading(false)
        } catch (error) {
            setLoading(false)
          toast.error(error?.response.data?.error)
        throw new Error("Error:", error);
        }
      };
  return {handleSubmit,loading}
}

export default useJobs