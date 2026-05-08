const express = require('express');
const cors = require('cors'); 


const categoriasmock = require('./routes/categoriasmock.js');
const inicializarBase = require('./models/inicializarBase.js');
const categoriasRouter = require('./routes/categorias.js');
const articulosRouter = require('./routes/articulos.js');
const seguridadRouter = require('./routes/seguridad.js');
const usuariosRouter = require('./routes/usuarios.js');


const app = express();
app.use(express.json()); 

app.use(cors({
  origin: '*'
}));

app.use(categoriasmock);
app.use(categoriasRouter);
app.use(articulosRouter);
app.use(seguridadRouter);
app.use(usuariosRouter);

app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});


app.get("/_isalive", (req, res) => {
  const uptime = process.uptime(); 
  const date = app.locals.fechaInicio;
  res.send(`Ejecutandose desde: ${date.toLocaleString('es-AR')} (hace ${uptime.toFixed(0)} segundos)`);
});


app.use((req, res, next) => {
  res.status(404).send('No encontrada!');
});


const port = 3000;
app.locals.fechaInicio = new Date(); 

if (require.main === module) {
  inicializarBase().then(() => {
    app.listen(port, () => {
      console.log(`Sitio escuchando en el puerto ${port}`);
    });
  })
  .catch(err => {
    console.error("Error al inicializar la base de datos:", err);
    process.exit(1); 
  });
}

module.exports = app;

