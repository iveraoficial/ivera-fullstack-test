import axios from "../../config/axios.js";
import {montarQueryStringApi} from "../Helpers/queryStringApi.js";

const listarPersonagens = (offset, limite, name) => {
    const apiAuth = montarQueryStringApi();
    let url = `/v1/public/characters?${apiAuth}&limit=${limite}&offset=${offset}`;

    if(name !== null) {
        url += `&nameStartsWith=${name}`
    }

    return axios.get(url);
}

const pegarPersonagemPorId = (id) => {
    const apiAuth = montarQueryStringApi();
    let url = `/v1/public/characters/${id}?${apiAuth}`;

    return axios.get(url);
}

export {
    listarPersonagens,
    pegarPersonagemPorId
}