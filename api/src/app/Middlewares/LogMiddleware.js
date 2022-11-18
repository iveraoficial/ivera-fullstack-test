import {salvarLog} from "../Repositories/logRepository.js";

const LogMiddleware = async (request, response, next) => {
    try {
        const {url, method, params, query} = request;

        const log = {
            metodo: method,
            url: url,
            parametros: params,
            query: query,
        };


        await salvarLog(log);
        next();
    } catch (e) {
        console.log(e.message);
    }
}

export default LogMiddleware;