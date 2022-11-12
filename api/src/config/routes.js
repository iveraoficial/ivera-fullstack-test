import {Router} from "express";
import PersonagensController from "../app/Controllers/PersonagensController.js";
const router = new Router();

router.get("/personagens",PersonagensController.listarPersonagens);

export default router;