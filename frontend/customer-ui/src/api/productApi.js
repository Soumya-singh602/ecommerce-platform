import axios from "axios";


const API = `${import.meta.env.VITE_API_URL}/products/`;


export const getProducts = async(params={})=>{


    const response = await axios.get(
        API,
        {
            params: params
        }
    );


    return response.data;

};