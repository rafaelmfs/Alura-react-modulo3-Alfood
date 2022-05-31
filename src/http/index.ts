import axios from "axios";

export const http = axios.create({
    baseURL: "http://0.0.0.0:8000/api/v2/"
})