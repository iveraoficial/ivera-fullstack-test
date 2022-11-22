import express from "express";
import "dotenv/config";
import 'express-async-errors';

import router from "./src/config/routes.js";

const app = express();

app.use(express.json());

app.use("/api", router);

const port = process.env.APP_PORT;
app.listen(port, () => {console.log(`A aplicacao esta rodando na porta ${port}...`)});