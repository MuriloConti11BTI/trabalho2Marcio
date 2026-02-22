const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /produtos_Juka - Retorna todos os produtos_Juka
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM produtos_Juka ORDER BY id DESC');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
});

// POST /produtos_Juka - Cria um novo produto_Juka
router.post('/', async (req, res) => {
  try {
    const { nome, preco, categoria, descricao } = req.body;

    if (!nome || preco === undefined || !categoria || !descricao) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO produtos_Juka (nome, preco, categoria, descricao) VALUES (?, ?, ?, ?)',
      [nome, parseFloat(preco), categoria, descricao]
    );
    connection.release();

    res.status(201).json({ 
      id: result.insertId, 
      nome, 
      preco: parseFloat(preco), 
      categoria, 
      descricao 
    });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
});

// DELETE /produtos_Juka/:id - Deleta um produto_Juka
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validação do ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const connection = await pool.getConnection();
    
    // Verificar se o produto existe
    const [produto] = await connection.query('SELECT id FROM produtos_Juka WHERE id = ?', [id]);
    
    if (produto.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Deletar o produto
    const [result] = await connection.query('DELETE FROM produtos_Juka WHERE id = ?', [id]);
    connection.release();

    if (result.affectedRows > 0) {
      res.json({ message: 'Produto deletado com sucesso' });
    } else {
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
});

module.exports = router;
