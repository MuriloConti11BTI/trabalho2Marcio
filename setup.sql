-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS web_03mb;
USE web_03mb;

-- Criar tabela de produtos_Juka
CREATE TABLE IF NOT EXISTS produtos_Juka (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  descricao TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
