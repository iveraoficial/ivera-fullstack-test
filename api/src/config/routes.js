import {Router} from "express";
import PersonagensController from "../app/Controllers/PersonagensController.js";
const router = new Router();

router.get("/personagens", PersonagensController.listarPersonagens);
router.get("/personagens/:id", PersonagensController.visualizarPersonagem);

export default router;