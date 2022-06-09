import axios from "axios";

//Aqui é onde fazemos a comunicação com a API que está rodando em localhost na porta 8000.
export const http = axios.create({
    baseURL: "http://0.0.0.0:8000/api/v2/"
})