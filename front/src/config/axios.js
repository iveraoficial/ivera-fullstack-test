import axios from "axios";
import "dotenv/config";

export default axios.create({
    baseURL: process.env.API_URL,
    responseType:"json"
});