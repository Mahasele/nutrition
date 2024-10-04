import axios from "axios";

export default axios.create({
    baseURL:'https://z01514dd-5000.uks1.devtunnels.ms'
})

export const axiosIntercepter = axios.create({
    baseURL:'https://z01514dd-5000.uks1.devtunnels.ms',
    headers:{
        "Content-Type":'application/json'
    },
    withCredentials:true
})