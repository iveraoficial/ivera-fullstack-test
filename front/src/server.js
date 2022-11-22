import * as url from 'url';
import express from "express";
import expressLayouts from "express-ejs-layouts";
import {resolve} from 'path';
import router from "./routes/routes.js";
import "dotenv/config";

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.set("view engine", "ejs");

app.set("views", "./src/views");
app.use(expressLayouts);
app.use('/static', express.static(resolve(__dirname, '..', 'public')));

app.use(router);

const port = process.env.APP_PORT;
app.listen(port, () => {console.log(`A aplicacao esta rodando na porta ${port}...`)});