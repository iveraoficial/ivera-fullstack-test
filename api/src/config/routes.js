import {Router} from "express";
import PersonagensController from "../app/Controllers/PersonagensController.js";
import UsuarioController from "../app/Controllers/UsuarioController.js";
import {usuarioValidacao} from "../app/Validators/CadastroValidator.js";
const router = new Router();

router.get("/personagens", PersonagensController.listarPersonagens);
router.get("/personagens/:id", PersonagensController.visualizarPersonagem);
router.post("/usuario", usuarioValidacao,UsuarioController.salvar)

export default router;