import axios from "axios";
import { AppError } from "../utils/AppError";

const baseURL = () => {
    return 'http://127.0.0.1:8000/api'
}

const api = axios.create({
    baseURL: baseURL()
});

api.interceptors.response.use((response) => response, error => {

    if(error.response && error.response.data) {       
        return Promise.reject(new AppError(error.response.data.message))

    } else {
        return Promise.reject(new AppError('Erro no servidor. Tente mais tarde!'))
    }
});

export { api , baseURL};
