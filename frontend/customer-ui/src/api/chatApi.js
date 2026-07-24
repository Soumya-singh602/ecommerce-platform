import axios from "axios";


const API = "http://localhost:8080/api/chat";


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