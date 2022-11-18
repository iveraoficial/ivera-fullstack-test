import LogModel from "../Models/Log.js";

const salvarLog = (log) => {
    return LogModel.create(log);
}

export {
    salvarLog
}