import {salvar} from "../Repositories/usuarioRepository.js";
import bcrypt from "bcrypt";


class UsuarioController {
    async salvar(request, response) {
        try {
            const usuario = request.body;
            usuario.senha = await bcrypt.hash(request.body.senha, 10);
            const novoUsuario = await salvar(usuario)

            return response.json(novoUsuario)
        } catch (error) {
            return response.status(409).json({error: error.message});
        }
    }
}

export default new UsuarioController()