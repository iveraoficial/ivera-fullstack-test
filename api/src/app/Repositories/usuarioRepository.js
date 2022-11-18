import UsuarioModel from "../Models/Usuario.js";

const salvar = (usuario) => {
    return UsuarioModel.create(usuario);
}

const pegarUsuarioPorEmail = (email) => {
    return UsuarioModel.findOne({email})
}

export {
    salvar,
    pegarUsuarioPorEmail
}