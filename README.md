## Tech test to integrate the iVera Team 🏡

### Showing the steps to run the application

---

### ​👷‍♂️​ Acessar o Projeto

◽ Clonar o repositório:

```
git clone https://github.com/brseghese/ivera-fullstack-test.git
```

◽ Instalar dependências:

```
npm install
```

◽ Criar arquivo `config.env` na raiz do projeto e definir as variáveis:

```
NODE_ENV=development
PORT=3000

DATABASE=******
DATABASE_PASSWORD=******

JWT_SECRET=******
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90

MARVEL_PUBLIC_KEY=******
MARVEL_PRIVATE_KEY=******
```

[MongoDb](https://www.mongodb.com/)

[JWT](https://jwt.io/libraries)

[Marvel Api](https://developer.marvel.com/documentation/getting_started)

◽ Executar o script:

```
npm run start
```

Acessar os endpoints conforme requisitos abaixo.

---

## Resolução Backend

### Acesse aqui o [Postman](https://documenter.getpostman.com/view/21383137/2s8YeprC8R) para ver a documentação.

---

### Functionalities

🔴 A route to create admin users;

Cadastrar novo usuario

- Administrador = `"role": "admin"`
- Usuário: `"role": "user"`

```
http://127.0.0.1:3000/api/v1/user

{
    "name": "Usuário",
    "email": "user@ivera.com",
    "password": "12345678",
    "passwordConfirm": "12345678",
    "role": "user"
}
```

Para cadastrar usuário é preciso estar logado como administrador.

Administrador de teste:

- login: `admin@ivera.com`
- senha: `12345678`

Obs. a senha é salva no banco criptografada.

---

🔴 A route to login with admin users (Use the login method that you prefer);

Login

```
http://127.0.0.1:3000/api/v1/login

{
    "email": "usuario@ivera.com",
    "password": "12345678"
}
```

Para fazer login, tem que estar cadastrado e informar `email` e `senha`.

---

🔴 A route of character list, accepting parameters of filters and pagination;

```
http://127.0.0.1:3000/api/v1/characters
```

Parametros:

`&limit=20` : limita a paginação em 20; <br>
`&offset=20` : pula 20 personagens para a próxima página;

---

🔴 A route of **character details**, taking the character id as a parameter;

```
http://127.0.0.1:3000/api/v1/characters/id
```

---

🔴 A **middleware for log requests**, containing request method, url and parameters saved; <br>

🔴 A route (authenticated only admin users) of **history**, containing all the log requests saved on MongoDB (No need front-end, only back-end call. Only admin profile)

```
http://127.0.0.1:3000/api/v1/logs
```

Para acessar essa rota é preciso estar logado com administrador.

---

## Resolução Frontend

### Functionalities

🔴 A page of **character list**, using parameters, filters and pagination created before;

🔴 A page of **character details**, that shows all info returned from the backend by clicking on a character on the list created before;

Com a aplicação em execução conforme orientado no início, abra http://localhost:3000 no seu navegador para ver a aplicação.

---

Preview:

<div align="center">
<img width='600px' src="./public/img/review.png" width="35px"/>
</div>

<br>

<div align="center">
<img width='600px' src="./public/img/review-2.png" width="35px"/>
</div>

---

#### 💬 Sinta-se a vontade para entrar em contato

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brunoseghese/) [![Github Badge](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/brseghese) [![Gmail Badge](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:brseghese@gmail.com)

---

> Desenvolvido com ❤️ por **Bruno Seghese**

---

## Tech test to integrate the iVera Team 🏡

![SoExcited~GIF](https://user-images.githubusercontent.com/25944558/155590591-4061828a-e437-4b15-80cb-f56a30205bca.gif)

<br>

## Create a Rest API and a SPA that consumes and shows the official [Marvel Comics API](https://developer.marvel.com/docs).

## :computer: Functionalities (Back-end)

🔴 A route to create admin users;<br>
🔴 A route to login with admin users (Use the login method that you prefer);<br>
🔴 A route of **character list**, accepting parameters of filters and pagination;<br>
🔴 A route of **character details**, taking the character id as a parameter;<br>
🔴 A **middleware for log requests**, containing request method, url and parameters saved;<br>
🔴 A route (authenticated only admin users) of **history**, containing all the log requests saved on MongoDB (No need front-end, only back-end call. Only admin profile)

## :computer: Functionalities (Front-end)

🔴 A page of **character list**, using parameters, filters and pagination created before;<br>
🔴 A page of **character details**, that shows all info returned from the backend by clicking on a character on the list created before;<br>

## Technologies and tools you have to use:

☑️ Javascript ES6+ <br>
☑️ Nodejs <br>
☑️ MongoDB <br>
☑️ Any front-end framework/library (feel free to use [Vuejs](https://vuejs.org/), [Reactjs](https://reactjs.org/), [EJS](https://ejs.co/) or any other 🚀) <br>
☑️ Express (for the back-end) <br>
☑️ Be free to use any other tools/tecs if you need <br>

## Start instructions

- Create a fork of this project
- Do all the tasks to complete the application
- Create a README.md showing the steps to run the application
- Make a merge request on the main branch
- Send us the link of the merge request

---
