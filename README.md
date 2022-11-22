# Instalação
## API
- Renomeie os arquivos ``.env.example`` para ``.env`` dentro da pasta ``api``;
- Ajuste as variáveis ``API_KEY`` e ``PRIVATE_KEY`` com as informações cedidas pela API da Marvel;
- Ajuste a string da conexão do MongoDB na variável ``MONGO_URI``;
- No terminal de comando, navegue até o diretório ``api`` e execute ``npm install`` ou ``yarn`` para instalar as dependências.
- Após terminar, execute ``npm run dev:start`` e a API subirá na porta 4000 (pode ser configurada no .env da api, na variável ``APP_PORT``);

## Frontend
- Renomeie os arquivos ``.env.sample`` para ``.env`` dentro da pasta ``front``.;
- Ajuste a variável ``API_URL`` conforme a porta configurada no .env da API. (Caso a porta da API continue a mesma, não será necessário alterar.)
- No terminal de comando, navegue até o diretório ``front`` e execute ``npm install`` ou ``yarn`` para instalar as dependências.
- Após terminar, execute ``npm run dev:start`` e a API subirá na porta 8000 (pode ser configurada no .env do front, na variável ``APP_PORT``);
- Abra no navegador ``http:localhost:8000`` e deverá aparecer o projeto rodando.

## Rotas para teste da API.
Está sendo disponibilizado a collection do Insomnia, com todas as rotas da API que foram criadas.<Br>
Está localizada dentro do diretório ``api``.