import axios from "../../config/axios.js";
import {montarQueryStringApi} from "../Helpers/queryStringApi.js";

const listarPersonagens = (offset, limite, name) => {
    const apiAuth = montarQueryStringApi();
    let url = `/v1/public/characters?${apiAuth}&limit=${limite}&offset=${offset}`;

    if(name !== null) {
        url += `&nameStartsWith=${name}`
    }
    console.log("URL", url)
    return axios.get(url);
}


// let url = `/v1/public/characters/${id}?${apiAuth}
export {
    listarPersonagens
}