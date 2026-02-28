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

-- Tabela de itens (usada pelo backend)
CREATE TABLE IF NOT EXISTS itens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    quantidade INTEGER NOT NULL CHECK (quantidade >= 0),
    preco NUMERIC(12,2) NOT NULL CHECK (preco >= 0),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insere item de exemplo
INSERT INTO itens (nome, quantidade, preco)
VALUES ('Item de exemplo', 5, 19.90) ON CONFLICT DO NOTHING;

-- Tabela de movimentações 
CREATE TABLE IF NOT EXISTS movimentacoes (
    id SERIAL PRIMARY KEY,
    produto_id INTEGER NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('entrada', 'saida')),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id)
);

-- Popular um admin de teste (senha: admin123 - hash gerado com bcrypt)
INSERT INTO usuarios (usuario, senha, perfil)
VALUES (
    'admin',
    '$2a$10$HIeqKtJxFBrZBmyu0sg8Gu.731v32BIM6v.XIrCwa0rEX6j1tS.IK', -- bcrypt.hashSync('admin123', 10)
    'admin'
) ON CONFLICT (usuario) DO NOTHING;