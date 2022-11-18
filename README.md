# store-manager-api
REST API, que maneja dados de produtos e vendas de uma loja fictícia.
Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão.

Techs: Node, Express.js, MySQL, JOI, Mocha, Chai, Sinon.

## Como testar na sua máquina

1. Clone o repositório

- `git clone git@github.com:renatozr/store-manager-api.git`
  - ou
- `git clone https://github.com/renatozr/store-manager-api.git`

- Entre na pasta do repositório que você acabou de clonar:
  - `cd store-manager-api`

2. Instale as dependências

- `npm install`

3. Crie o banco de dados

  - copie e execute as querys do arquivo `StoreManager.sql` no seu MySQL

4. Crie as váriaveis de ambiente

- crie o arquivo `.env` na raiz do projeto
- copie o exemplo abaixo, porém preencha as variáveis com as informações necessárias para rodar na sua máquina
```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```

5. Rode a aplicação

 - `npm start`

6. Faça suas requisições

- exemplo caso a variável de ambiente PORT=3000
  - http://localhost:3000/products

##
Arquivos que não foram escritos por mim: .eslintignore, .eslintrc.json, .gitignore, StoreManager.sql
