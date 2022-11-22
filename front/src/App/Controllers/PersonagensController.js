import {listarPersonagem, pegarPersonagemPorId} from "../Repositories/personagemRepository.js";

class PersonagensController {
    async index (request, response) {
        const personagens = await listarPersonagem();
        response.locals = {title: "Home - "};
        return response.render("personagens/index", {personagens: personagens?.data});
    }

    async mostrarPersonagem(request, response) {
        const { id } = request.params;
        const personagem = await pegarPersonagemPorId(id);

        response.locals = {title: personagem.data.nome + " - " };
        return response.render("personagens/detalhes-personagem", {personagem: personagem.data});
    }
}

export default new PersonagensController