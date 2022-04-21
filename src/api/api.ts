import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    headers: {
        "API-KEY": "4c71dd1e-5882-40af-9b58-9e6b4ed64528"
    }
});