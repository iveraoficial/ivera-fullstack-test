const validator = require('validator');
const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');

const LoginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {type: String, required: true},
    password: {type: String, required: true}
  });
  
  const LoginModel = mongoose.model('Login', LoginSchema);

class Login{
    constructor(body){
        this.body = body
        this.user = null;
        this.errors = [];
    }

    cleanUpLogin(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body ={
            email: this.body.email,
            password: this.body.password
        };
    }

    validaLogin(){
        this.cleanUpLogin()
        //validação
        //o email nao pode estar vazio
        if(!this.body.email) this.errors.push('email invalido');

        //senha de 6 a 15 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 15){
            this.errors.push('a senha tem que ter somente entre 6 e 15 caracteres');
        }
    }

    async login(){
        this.validaLogin()
        if(this.errors.length > 0) return;

        this.user = await LoginModel.findOne({email: this.body.email});

        if(!this.user){
            this.errors.push('usuario nao existe');
            return;
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('senha invalida');
            this.user = null;
            return
        }
    }

    cleanUpRegister(){
        for(const key in this.body){
            if(typeof this.body[key] !== 'string'){
                this.body[key] = '';
            }
        }
        this.body ={
            name: this.body.name,
            email: this.body.email,
            password: this.body.password
        };
    }

    validaRegister(){
        this.cleanUpRegister()
        //validação
        //o login nao pode estar vazio
        if(!this.body.name) this.errors.push('nome esta vazio');

        //o email precisa ser valido
        if(!validator.isEmail(this.body.email)){
            this.errors.push('email invalido');
        }

        //senha de 6 a 15 caracteres
        if(this.body.password.length < 6 || this.body.password.length > 15){
            this.errors.push('senha tem que ter somente entre 6 e 15 caracteres');
        }
    }

    async register(){
        this.validaRegister();
        if(this.errors.length > 0) return;

        await this.userExists();
        if(this.errors.length > 0) return;


        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists(){
        this.user = await LoginModel.findOne({email: this.body.email})
        if(this.user) this.erros.push('email ja utilizado');
    }
}

module.exports = Login;