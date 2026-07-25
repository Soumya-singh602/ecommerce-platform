import axios from "axios";


const API = `${import.meta.env.VITE_API_URL}/chat`;


export const getChatHistory = async (
    adminId,
    customerId
)=>{

    const response = await axios.get(
        `${API}/history/${adminId}/${customerId}/`,
        {
            headers:{
                Authorization:
                `Bearer ${localStorage.getItem("access")}`
            }
        }
    );


    return response.data;

};