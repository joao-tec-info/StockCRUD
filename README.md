# Gerenciador de Estoque — Guia para iniciantes se nao for pode pular a sessao 

Este projeto é uma aplicação simples de gerenciamento de estoque com:
- Backend (API) em Node/Express
- Banco de dados PostgreSQL
- Frontend em React

Objetivo deste README: ajudar uma pessoa sem experiência em programação a rodar a aplicação localmente.

Pré-requisitos (instalar antes):
- Docker Desktop (Windows) — inclui o Docker Engine e o docker-compose.
- Navegador web (Chrome, Edge, Firefox).

Opção recomendada (fácil): rodar tudo com Docker (mais simples). Se quiser rodar apenas o frontend localmente, há instruções opcionais abaixo.

1) Abrir o terminal (PowerShell) na pasta do projeto

 - Abra o Explorador de Arquivos e vá até a pasta do projeto (por exemplo: `C:\Users\SeuUsuario\gerenciador-de-estoque`).
 - Clique com o botão direito e escolha "Abrir no Terminal" ou abra o PowerShell e navegue até essa pasta:

```powershell
cd C:\Users\SeuUsuario\gerenciador-de-estoque
```

2) Subir os serviços com Docker

No PowerShell (na pasta do projeto) execute:

```powershell
docker-compose up -d --build
```

O comando vai baixar imagens (se necessário), construir o backend e iniciar os serviços:
- `db` (Postgres) na porta 5432
- `backend` (API) na porta 5000

Observações:
- Na primeira inicialização o banco aplica os scripts de `db/init.sql` para criar tabelas e um usuário de exemplo.
- Se o Docker pedir permissões, aceite.

3) Abrir o frontend

O frontend está dentro da pasta `frontend`. Para facilitar, o projeto já tem um servidor de desenvolvimento que pode ser iniciado localmente.

No PowerShell, dentro da pasta do projeto, rode:

```powershell
cd frontend
npm install --no-audit --no-fund
npm start
```

Durante o `npm start` o sistema pode perguntar se você quer iniciar em outra porta (se a 3000 já estiver em uso) — responda `yes`. O terminal vai informar o endereço (ex.: `http://localhost:3003`).

4) Acessar a aplicação no navegador

- Abra o navegador e vá para a URL mostrada pelo `npm start` (ex.: `http://localhost:3003`).
- Na tela de login use as credenciais de exemplo:
  - Usuário: `admin`
  - Senha: `admin123`

5) Usando a aplicação (fluxo básico)

- Depois de logar você verá a lista de itens (estoque).
- Para criar setores: no menu `Setores` você pode criar e remover setores.
- Para movimentar um item: na lista de estoque clique no botão `Movimentação` de um item, selecione `entrada` ou `saída`, informe a quantidade e (opcional) setor destino.
- Para ver o histórico de movimentações: abra `Movimentações` no menu.

Regras importantes (validações que o sistema aplica):
- Não é permitida quantidade negativa.
- Saída não pode ser maior que o estoque disponível — o backend rejeita essa operação.
- Toda movimentação gera um registro no histórico (`movimentacoes`) com quem fez, quando, tipo, produto e quantidade.

Resolução de problemas comuns

- Se o frontend disser que não consegue carregar itens:
  - Verifique se os containers estão rodando: `docker-compose ps`.
  - Veja logs do backend: `docker-compose logs backend --tail=80`.
  - Aguarde alguns segundos após subir o Docker — o banco precisa estar pronto na primeira inicialização.

- Erros de autenticação (token expirado / invalido):
  - Faça logout e logue novamente no frontend.
  - Limpe o token do navegador (na DevTools → Console rode: `localStorage.removeItem('token')`) e faça login de novo.

- Porta 3000 já em uso ao iniciar o frontend: aceite iniciar em outra porta quando perguntado.

Parar os serviços

No PowerShell, na pasta do projeto:

```powershell
docker-compose down
# se quiser também parar o frontend local: Ctrl+C no terminal onde rodou 'npm start'
```

Executar apenas backend+db via Docker (sem frontend local)

Se você preferir não rodar o frontend local, o `docker-compose up -d --build` inicia o banco e backend; você pode testar endpoints com o Postman ou curl:

```powershell
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"usuario":"admin","senha":"admin123"}'
```

Segurança / notas finais

- As senhas e tokens de exemplo neste projeto são apenas para desenvolvimento. Não use essas credenciais em produção.
- O JWT usado pelo backend expira (padrão 1 hora). Se a sessão expirar você será redirecionado para a tela de login.

# StockCRUD - Gerenciador de Estoque Simples

StockCRUD é um sistema básico de gerenciamento de estoque desenvolvido como projeto acadêmico. O objetivo é demonstrar um fluxo completo full-stack com **CRUD** (Create, Read, Update, Delete) funcional, usando tecnologias modernas e boas práticas de desenvolvimento.

## Tecnologias Utilizadas

### Backend
- Node.js + Express  
- PostgreSQL (banco relacional)  
- Docker + Docker Compose (containerização)  
- JWT (autenticação em desenvolvimento)  
- bcryptjs (hash de senhas)

### Frontend
- React (Create React App)  
- React Bootstrap (estilização rápida e responsiva)  
- Axios (chamadas à API)  
- react-hot-toast (notificações de sucesso/erro)

### Infraestrutura
- Docker Compose para rodar backend + banco localmente

## Funcionalidades Atuais
- Listagem de itens em estoque  
- Cadastro de novo item (modal)  
- Edição de item existente (reutilizando modal)  
- Exclusão de item com confirmação (modal separado)  
- Mensagens de feedback (toast)  
- Tabela responsiva com formatação de valores monetários  
- Modais reutilizáveis e separados para cadastro/edição e exclusão

## Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (v18 ou superior)  
- Docker e Docker Compose instalados  
- Git (opcional)

### Passo a passo

1. Clone o repositório  
   ```bash
   git clone https://github.com/joao-tec-info/stockcrud.git
   cd stockcrud

2. Inicie o backend + banco com Docker
    ```Bash
    docker-compose up -d --build

    Isso sobe:
        PostgreSQL
        Backend na porta 5000
        Cria automaticamente as tabela

3. Inicie o frontend (em outro terminal)
        cd frontend
        npm install
        npm start
    O React abre automaticamente em: http://localhost:3000

4. Acesse o sistema
    Frontend: http://localhost:3000
    Backend API: http://localhost:5000/api/itens (teste com Postman ou navegador)

5. Estrutura de Pastas do Projeto
        stockcrud/
        ├── backend/                    # API Node.js + Express
        │   ├── src/
        │   │   ├── config/
        │   │   ├── controllers/
        │   │   ├── middlewares/
        │   │   ├── routes/
        │   │   └── index.js
        │   ├── Dockerfile
        │   └── package.json
        ├── frontend/                   # Interface React
        │   ├── src/
        │   │   ├── components/
        │   │   │   ├── common/
        │   │   │   ├── layout/
        │   │   │   └── stock/
        │   │   ├── pages/
        │   │   ├── services/
        │   │   └── App.jsx
        │   └── package.json
        ├── db/
        │   └── init.sql                # Script inicial do banco
        ├── docker-compose.yml
        └── README.md

5. Rotas
    Método,     URL,          Descrição,        Status esperado
    GET,    /api/itens,     Lista todos os itens,       200
    POST,   /api/itens,       Cria novo item,           201
    GET,    /api/itens/:id,    Busca item por ID,       200 / 404
    PUT,    /api/itens/:id,     Atualiza item,          200 / 404
    DELETE, /api/itens/:id,      Exclui item,           200 / 404
