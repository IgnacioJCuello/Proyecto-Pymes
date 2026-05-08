const express = require('express'); 
const router = express.Router();

let arr_CategoriasMock = [
  {
    "IdCategoria": 1,
    "Nombre": "ACCESORIOS"
  },
  {
    "IdCategoria": 2,
    "Nombre": "AUDIO"
  },
  {
    "IdCategoria": 3,
    "Nombre": "CELULARES"
  },
  {
    "IdCategoria": 4,
    "Nombre": "CUIDADO PERSONAL"
  },
  {
    "IdCategoria": 5,
    "Nombre": "DVD"
  },
  {
    "IdCategoria": 6,
    "Nombre": "FOTOGRAFIA"
  },
  {
    "IdCategoria": 7,
    "Nombre": "FRIO-CALOR"
  },
  {
    "IdCategoria": 8,
    "Nombre": "GPS"
  },
  {
    "IdCategoria": 9,
    "Nombre": "INFORMATICA"
  },
  {
    "IdCategoria": 10,
    "Nombre": "LED-LCD"
  }
];

router.get('/api/categoriasmock', async function (req, res) {
  const { Nombre } = req.query;

  if (Nombre) {
    // Filtrar por nombre que contenga el texto buscado (sin importar mayúsculas)
    const nombreBuscado = Nombre.toLowerCase();

    const categoriasFiltradas = arr_CategoriasMock.filter(categoria =>
      categoria.Nombre.toLowerCase().includes(nombreBuscado)
    );

    res.json(categoriasFiltradas);
  } else {
    // Si no se pasa ningún parámetro, devolver todos como antes
    res.json(arr_CategoriasMock);
  }
});


router.get('/api/categoriasmock/:id', async function (req, res) {
  let categoria = arr_CategoriasMock.find(
    (x) => x.IdCategoria == req.params.id
  );
  if (categoria) res.json(categoria);
  else res.status(404).json({ message: 'categoria no encontrado' });
});


router.post('/api/categoriasmock/', (req, res) => {
  const { Nombre } = req.body;
  let categoria = {
    Nombre,
    IdCategoria: Math.floor(Math.random()*100000),
  };

  // aqui agregar a la coleccion
  arr_CategoriasMock.push(categoria);

  res.status(201).json(categoria);
});


router.put('/api/categoriasmock/:id', (req, res) => {
  let categoria = arr_CategoriasMock.find(
    (x) => x.IdCategoria == req.params.id
  );

  if (categoria) {
    const { Nombre } = req.body;
    categoria.Nombre = Nombre;
    res.json({ message: 'categoria actualizado' });
  } else {
    res.status(404).json({ message: 'categoria no encontrado' })
  }
});


router.delete('/api/categoriasmock/:id', (req, res) => {
  let categoria= arr_CategoriasMock.find(
    (x) => x.IdCategoria == req.params.id
  );

  if (categoria) {
    arr_CategoriasMock = arr_CategoriasMock.filter(
      (x) => x.IdCategoria != req.params.id
    );
    res.json({ message: 'categoria eliminado' });
  } else {
    res.status(404).json({ message: 'categoria no encontrado' })
  }
});

module.exports = router;
