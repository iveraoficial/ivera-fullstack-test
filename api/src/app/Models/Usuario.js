import mongoose from "../../config/mongoose.js";

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: false
    },
    email: {
        type: String,
        unique:true,
        required: false,
        lowercase:true
    },
    senha: {
        type: String,
        required: true
    }
});

const UsuarioModel = mongoose.model('Usuario', usuarioSchema);

export default UsuarioModel;