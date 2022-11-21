import {Router} from "express";
import PersonagensController from "../app/Controllers/PersonagensController.js";
import UsuarioController from "../app/Controllers/UsuarioController.js";
import {usuarioValidacao} from "../app/Validators/CadastroValidator.js";
import {logarValidacao} from "../app/Validators/LoginValidator.js";
import AuthMiddleware from "../app/Middlewares/AuthMiddleware.js";
import LogMiddleware from "../app/Middlewares/LogMiddleware.js";
import ListarLogController from "../app/Controllers/ListarLogController.js";
const router = new Router();

//router.use(LogMiddleware);

router.get("/personagens", LogMiddleware, PersonagensController.listarPersonagens);
router.get("/personagens/:id", LogMiddleware, PersonagensController.visualizarPersonagem);

router.post("/usuario", LogMiddleware, AuthMiddleware, usuarioValidacao, UsuarioController.salvar)
router.post("/autenticar", LogMiddleware, logarValidacao, UsuarioController.logar)

router.get("/mostrando-logs", LogMiddleware, AuthMiddleware, ListarLogController.ListarLogs)


export default router;