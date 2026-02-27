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
