import axios from "axios";


const API = "http://localhost:8080/api/products/";


export const getProducts = async(params={})=>{


    const response = await axios.get(
        API,
        {
            params: params
        }
    );


    return response.data;

};