-- Tabela de usuários 
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    usuario VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,         
    perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('admin', 'estoquista', 'consulta')),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de produtos 
CREATE TABLE IF NOT EXISTS produtos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
    minimo INTEGER NOT NULL CHECK (minimo >= 0),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens
CREATE TABLE IF NOT EXISTS itens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
    preco NUMERIC(12,2) NOT NULL CHECK (preco >= 0),
    minimo INTEGER NOT NULL DEFAULT 1 CHECK (minimo >= 0),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insere item de exemplo
INSERT INTO itens (nome, quantidade, preco, minimo)
VALUES ('Item de exemplo', 5, 19.90, 3) ON CONFLICT DO NOTHING;

-- Tabela de movimentações 
-- Tabela de setores
CREATE TABLE IF NOT EXISTS setores (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) UNIQUE NOT NULL
);

-- Coluna de setor em itens (se ainda não existir será adicionada em migração)
-- criada dinamicamente em runtime para bancos existentes

-- Tabela de movimentações (registra entradas, saídas e transferências)
CREATE TABLE IF NOT EXISTS movimentacoes (
    id SERIAL PRIMARY KEY,
    item_id INTEGER NOT NULL REFERENCES itens(id) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('entrada', 'saida', 'transferencia')),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
    setor_origem INTEGER REFERENCES setores(id),
    setor_destino INTEGER REFERENCES setores(id)
);

-- Popular um admin ou outros usuarios de teste (senha: admin123 - hash gerado com bcrypt)
INSERT INTO usuarios (usuario, senha, perfil)
VALUES (
    'admin',
    '$2a$10$HIeqKtJxFBrZBmyu0sg8Gu.731v32BIM6v.XIrCwa0rEX6j1tS.IK', -- bcrypt.hashSync('admin123', 10)
    'admin'
) ON CONFLICT (usuario) DO NOTHING;