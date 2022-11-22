import {Router} from "express";
import PersonagensController from "../App/Controllers/PersonagensController.js";

const router = new Router();

router.get("/", PersonagensController.index);
router.get("/detalhe-do-personagem/:id", PersonagensController.mostrarPersonagem);

export default router;