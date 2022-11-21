import LogModel from "../Models/Log.js";
import axios from "../../config/axios.js";

const salvarLog = (log) => {
    return LogModel.create(log);
}

const listarLog = (id) => {
    return LogModel.find(id);
}

export {
    salvarLog,
    listarLog
}