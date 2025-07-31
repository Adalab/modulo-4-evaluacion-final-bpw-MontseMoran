const express = require("express");
const cors = require("cors");
const db = require('./db/db');
const personajesRouter = require('./routes/personajes');
const frasesRouter = require ('./routes/frases')

require("dotenv").config();

const server = express();
server.use(cors());
const port = 4000;

server.listen(port, () => {
  console.log(`Server listening at: http://localhost:${port}`);
});

server.use(express.json());
server.get("/", (req, res) => {
  res.send("Servidor Simpsons funcionando correctamente");
});
server.use('/personajes', personajesRouter);
server.use ('/frases', frasesRouter);