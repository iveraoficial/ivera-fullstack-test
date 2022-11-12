import axios from "axios";
import "dotenv/config";

export default axios.create({
    baseURL: process.env.BASEURL_API,
    responseType:"json"
});