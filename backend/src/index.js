const express = require("express");
const cors = require("cors");
const db = require('../db/db');
const personajesRouter = require('./routes/personajes');
const frasesRouter = require ('./routes/frases');
const capitulosRouter = require ('./routes/capitulos');
const jwt = require('jsonwebtoken');    

require("dotenv").config();

const server = express();
server.use(cors());
const port = process.env.PORT || 4000;


server.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at: http://0.0.0.0:${port}`);
});

server.use(express.json());
server.get("/", (req, res) => {
  res.send("Servidor Simpsons funcionando correctamente");
});
server.use('/personajes', personajesRouter);
server.use ('/frases', frasesRouter);
server.use ('/capitulos', capitulosRouter);

const generateToken = (payload) => {
const token = jwt.sign(payload, 'secreto', { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'secreto');
    return decoded;
  } catch (err) {
    return null;
  }
};
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  req.user = decoded;
  next();
};

server.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = generateToken({ username });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }

});
  server.get('/ruta-protegida', authenticateToken, (req, res) => {
  res.json({
    message: 'Acceso autorizado',
    usuario: req.user.username
  });
});


