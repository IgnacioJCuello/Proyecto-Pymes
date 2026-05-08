const jwt = require("jsonwebtoken"); // Changed import statement

const accessTokenSecret = "youraccesstokensecret";
const refreshTokenSecret = "yourrefreshtokensecrethere";

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "token no es valido" });
      }

      res.locals.user = user; // Store user data in res.locals for subsequent middleware/routes
      next();
    });
  } else {
    res.status(401).json({ message: "Acceso denegado" });
  }
};

// Exporting multiple values in CommonJS
module.exports = { authenticateJWT, accessTokenSecret, refreshTokenSecret };
