const express = require("express");
const getConnection = require("../../db/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query("SELECT * FROM personajes");
     await conn.end();
    res.status(200).json(rows)
   
  } catch (error) {
    res.status(404).json({ error: "Error al obtener personajes" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
     const id = req.params.id;
    const [rows] = await conn.query("SELECT * FROM personajes WHERE id_personajes=?", [id]);
    await conn.end();
        if (rows.length === 0){
      return res.status(404).json ({message: "Personaje no encontrado"});
    }
     res.status(200).json(rows);
  } catch (error) {
    res.status(404).json({ error: "Error al obtener personaje" });
  }
});
router.post("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const { nombre, apellido, ocupacion, descripcion } = req.body;
    const [result] = await conn.query(
      "INSERT INTO personajes (nombre, apellido, ocupacion, descripcion ) VALUES (?, ?, ?, ?)",
      [nombre, apellido, ocupacion, descripcion]
    );
    await conn.end();
    res.status(200).json({ menssage: "personaje insertado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 
 router.delete("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const [result] = await conn.query(
      "DELETE FROM personajes WHERE id_personajes = ?",
      [id]
    );
    await conn.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }

    res.status(200).json({ menssage: "personaje eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 
 router.put("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const { nombre, apellido, ocupacion, descripcion } = req.body;
    const [result] = await conn.query(
      "UPDATE personajes SET nombre=?, apellido=?, ocupacion=?, descripcion=? WHERE id_personajes =?",
      [nombre, apellido, ocupacion, descripcion, id]
    );
    await conn.end();
    res.status(200).json({ mensaje: "personaje modificado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}); 

module.exports = router;
