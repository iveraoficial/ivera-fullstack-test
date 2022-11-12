import express from "express";
import "dotenv/config";
import router from "./src/config/routes.js";
import {montarQueryStringApi} from "./src/app/Helpers/queryStringApi.js";

const app = express();

app.use(express.urlencoded({
    extended: true
}));

montarQueryStringApi();

app.use("/api", router);

const port = process.env.APP_PORT;
app.listen(port, () => {console.log(`A aplicacao esta rodando na porta ${port}...`)});