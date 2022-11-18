import {salvar, pegarUsuarioPorEmail} from "../Repositories/usuarioRepository.js";
import bcrypt, {compare} from "bcrypt";
import pkg from 'jsonwebtoken';


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

    async logar(request, response) {
        const {email, senha} = request.body;

        const usuario = await pegarUsuarioPorEmail(email);

        if (typeof  usuario === "undefined") {
            return response.status(401).json({
                status: "fail",
                data: {
                    title: "Usuário não encontrado."
                }
            });
        }

        const senhaValida = await compare(senha, usuario.senha);

        if (!senhaValida) {
            return response.status(401).json({
                status: "fail",
                data: {
                    title: "Usuário não encontrado."
                }
            });
        }

        usuario.senha = undefined;

        const {sign} = pkg;
        const token = sign({usuario},
            process.env.JWT_SECRET, {
                expiresIn: "1d"
            }
        );


        return response.json({
            status: "success",
            data: {
                usuario,
                token
            }
        });

    }
}

export default new UsuarioController()