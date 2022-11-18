import mongoose from "../../config/mongoose.js";
import {Schema} from "mongoose";

const LogSchema = new mongoose.Schema({
    metodo: {
        type: String,
        require: false
    },
    url: {
        type: String,
        required: false,
    },
    parametros: {
        type: Object,
        require: false
    },
    query: {
        type: Object,
        require: false
    }
});

const LogModel = mongoose.model('Log', LogSchema);

export default LogModel;