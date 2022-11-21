import {listarLog} from "../Repositories/logRepository.js";

class ListarLogController {
    async ListarLogs(request, response,) {
        const mostrandoLogs = await listarLog();
        return response.json(mostrandoLogs);

    }
}

export default new ListarLogController();