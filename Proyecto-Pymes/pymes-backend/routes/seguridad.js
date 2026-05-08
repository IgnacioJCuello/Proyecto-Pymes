const express = require("express"); // Changed import statement
const jwt = require("jsonwebtoken"); // Changed import statement
const { accessTokenSecret, refreshTokenSecret } = require("../auth.js"); // Changed import statement (keeping .js for local file clarity)

const router = express.Router();

const users = [
  {
    usuario: "admin",
    clave: "123",
    rol: "jefe",
  },
  {
    usuario: "juan",
    clave: "123",
    rol: "empleado",
  },
];

let refreshTokens = [];

router.post("/api/login", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Login de usuarios: admin:123(rol jefe), juan:123(rol empleado)'

  const { usuario, clave } = req.body;

  const user = users.find(
    (u) => u.usuario === usuario && u.clave === clave
  );

  if (user) {
    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    const refreshToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      refreshTokenSecret
    );

    refreshTokens.push(refreshToken);

    res.json({
      accessToken,
      refreshToken,
      message: `Bienvenido ${user.usuario} (rol: ${user.rol})`,
    });
  } else {
    res.json({ message: "usuario o clave incorrecto" });
  }
});

router.post("/api/logout", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Logout: invalida el refresh token (no invalida el token actual!!!)'

  const authHeader = req.headers.authorization;
  let token = null;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  let message;
  if (refreshTokens.includes(token)) {
    message = "Usuario deslogueado correctamente!";
  } else {
    message = "Logout inválido!";
  }

  refreshTokens = refreshTokens.filter((t) => t !== token);

  res.json({ message });
});

router.post("/api/refreshtoken", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'refresh token'
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(refreshToken)) {
    return res.sendStatus(403);
  }

  jwt.verify(refreshToken, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    const accessToken = jwt.sign(
      { usuario: user.usuario, rol: user.rol },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({
      accessToken,
    });
  });
});

module.exports = router; // Changed export statement
