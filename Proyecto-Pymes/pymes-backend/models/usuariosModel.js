const { DataTypes } = require('sequelize');

const sequelize = require('./configurarSequelize');

const usuarios = sequelize.define('usuarios', {
  IdUsuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Rol: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

console.log('usuariosModel.js');

module.exports = usuarios;