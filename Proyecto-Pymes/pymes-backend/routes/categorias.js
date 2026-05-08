const express = require('express');
const categorias = require('../models/categoriasModel.js'); // Use .js extension or omit based on your setup

const router = express.Router();

// Obtener todas las categorías
router.get('/api/categorias', async (req, res) => {
  try {
    const categoriass = await categorias.findAll();
    res.json(categoriass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

// Obtener una categoría por ID
router.get('/api/categorias/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const categoria = await categorias.findByPk(id);

    if (!categoria) {
      return res.status(404).json({ error: `No se encontró la categoría con id ${id}` });
    }

    res.json(categoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la categoría' });
  }
});

module.exports = router; // Export the router using CommonJS

