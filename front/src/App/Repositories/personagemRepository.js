import axios from "../../config/axios.js";

const listarPersonagem = () => axios.get("/personagens");
const pegarPersonagemPorId = (id) => axios.get(`/personagens/${id}`);

export {
    listarPersonagem,
    pegarPersonagemPorId
}