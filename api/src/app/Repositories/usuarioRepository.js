import UsuarioModel from "../Models/Usuario.js";

const salvar = (usuario) => {
    return UsuarioModel.create(usuario);
}

export {
    salvar
}