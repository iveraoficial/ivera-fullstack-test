import {listarPersonagens, pegarPersonagemPorId} from "../Repositories/personagensRepository.js";

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
        personagens.limit = parseInt(limite);
        personagens.total = apiPersonagens.total;
        personagens.count = apiPersonagens.count;
        personagens.totalPages = Math.ceil(apiPersonagens.total / limite);
        personagens.currentPage = parseInt(pagina);
        personagens.results = [];

        for (let personagem of apiPersonagens.results) {

            let imagem = null;
            if (!personagem.thumbnail.path.includes("image_not_available")) {
                imagem = `${personagem.thumbnail.path}.${personagem.thumbnail.extension}`;
            }

            let item = {
                "id": personagem.id,
                "name": personagem.name,
                "thumbnail": imagem
            }

            personagens["results"].push(item);
        }

        return response.json(personagens);
    }

    async visualizarPersonagem(request, response) {
        const id = request.params.id || null;

        if (id === null) {
            return response.status(409).json({
                "status": "fail",
                "data": "Id do personagem obrigatória!"
            })
        }

        let apiPersonagensId = await pegarPersonagemPorId(id);
        if (typeof apiPersonagensId.data.data.code !== "undefined") {
            return response.status(404).json({
                "status": "Error",
                "data": "Personagem não encontrado!"
            })
        }
        apiPersonagensId = apiPersonagensId.data.data.results[0];

        let imagem = null;
        if (!apiPersonagensId.thumbnail.path.includes("image_not_available")) {
            imagem = `${apiPersonagensId.thumbnail.path}.${apiPersonagensId.thumbnail.extension}`;
        }

        let informacaoPersonagem = {
            "nome": apiPersonagensId.name,
            "descricao": apiPersonagensId.description,
            "thumbnail": imagem,
            "comics": apiPersonagensId.comics
        }

        return response.json(informacaoPersonagem)
    }
}

export default new PersonagensController();