import {listarPersonagens} from "../Repositories/personagensRepository.js";

class PersonagensController {
    async listarPersonagens(request, response) {
        const name = request.query.name || null;

        const pagina = request.query.page || 1;
        const limite = request.query.limit || process.env.LIMIT_PAGINATION;
        const offset = (pagina - 1) * limite;

        let apiPersonagens = await listarPersonagens(offset, limite, name);
        apiPersonagens = apiPersonagens.data.data;

        let personagens = {};
        personagens.offset = apiPersonagens.offset;
        personagens.limit = apiPersonagens.limit;
        personagens.total = apiPersonagens.total;
        personagens.count = apiPersonagens.count;
        personagens.results = [];

        for(let personagem of apiPersonagens.results) {
            let item = {
                "id": personagem.id,
                "name": personagem.name,
                "thumbnail": `${personagem.thumbnail.path}.${personagem.thumbnail.extension}`
            }

            personagens["results"].push(item);
        }

        return response.json(personagens);
    }


}

export default new PersonagensController();