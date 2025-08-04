const express = require("express");
const getConnection = require("../../db/db"); 
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query("SELECT frases.id_frases,frases.texto, frases.marca_tiempo, frases.descripcion, personajes.nombre AS personaje,capitulos.titulo AS capitulo FROM frases JOIN frases_has_capitulos ON frases.id_frases = frases_has_capitulos.frases_id_frases JOIN capitulos ON frases_has_capitulos.capitulos_id_capitulos = capitulos.id_capitulos JOIN personajes ON frases.personajes_id_personajes = personajes.id_personajes ORDER BY frases.id_frases ASC");
    await conn.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const [rows] = await conn.query("SELECT * FROM frases WHERE id_frases = ?", [id]);
    await conn.end();

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Frase no encontrada" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const { texto, marca_tiempo, descripcion, personajes_id_personajes, capitulos_id_capitulos} = req.body;
    const [result] = await conn.query(
      "INSERT INTO frases (texto, marca_tiempo, descripcion, personajes_id_personajes) VALUES (?, ?, ?, ?)",
      [texto, marca_tiempo, descripcion, personajes_id_personajes]
    );
    await conn.query(
  "INSERT INTO frases_has_capitulos (frases_id_frases, capitulos_id_capitulos) VALUES (?, ?)",
  [result.insertId, capitulos_id_capitulos]
);

    await conn.end();
    res.status(200).json({ mensaje: "Frase insertada correctamente", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const [result] = await conn.query("DELETE FROM frases WHERE id_frases = ?", [id]);
    await conn.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Frase no encontrada" });
    }

    res.json({ mensaje: "Frase eliminada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const { texto, marca_tiempo, descripcion, personajes_id_personajes } = req.body;
    const [result] = await conn.query(
      "UPDATE frases SET texto=?, marca_tiempo=?, descripcion=?, personajes_id_personajes=? WHERE id_frases=?",
      [texto, marca_tiempo, descripcion, personajes_id_personajes, id]
    );
    await conn.end();
    res.json({ mensaje: "Frase modificada" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;

