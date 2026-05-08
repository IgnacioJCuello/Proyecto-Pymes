const express = require('express'); // Changed import
const { authenticateJWT } = require('../auth.js'); // Changed import, keeping .js for clarity
const usuarios = require('../models/usuariosModel.js'); // Changed import, keeping .js for clarity

const router = express.Router();

// Obtener todos los usuarios, con seguridad JWT
router.get('/api/usuarios',
  authenticateJWT,
  async (req, res, next) => {
    try {
      // si llegó hasta acá, el token es válido

      // control de autorización según el rol
      const user = res.locals.user; // `res.locals.user` is usually set by the authenticateJWT middleware
      if (user.rol !== "jefe") {
        return res.status(403).json({ message: "usuario no autorizado!" });
      }

      const items = await usuarios.findAll();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
  });

module.exports = router; // Changed export
