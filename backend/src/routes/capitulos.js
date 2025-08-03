const express = require("express");
const getConnection = require("../../db/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const [rows] = await conn.query("SELECT * FROM capitulos");
    await conn.end();
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener capitulos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const [results] = await conn.query("SELECT * FROM capitulos WHERE id_capitulos = ?", [id]);
    await conn.end();

    if (results.length === 0) {
      return res.status(404).json({ mensaje: "Capitulo no encontrado" });
    }

    res.json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const conn = await getConnection();
    const { titulo, numero_episodio, temporada, fecha_emision, sinopsis } = req.body;
    const [result] = await conn.query(
      "INSERT INTO capitulos (titulo, numero_episodio, temporada, fecha_emision,sinopsis) VALUES (?, ?, ?, ?, ?)",
      [ titulo, numero_episodio, temporada, fecha_emision, sinopsis]
    );
    await conn.end();
    res.status(200).json({ mensaje: "Capitulo insertado correctamente", id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const [result] = await conn.query("DELETE FROM capitulos WHERE id_capitulos = ?", [id]);
    await conn.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Capitulo no encontrado" });
    }

    res.status(200).json({ mensaje: "capitulo eliminado", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const conn = await getConnection();
    const id = req.params.id;
    const { titulo, numero_episodio, temporada, fecha_emision,sinopsis } = req.body;
    const [result] = await conn.query(
      "UPDATE capitulos SET titulo=?, numero_episodio=?, temporada=?, fecha_emision=?,sinopsis=? WHERE id_capitulos=?",
      [titulo, numero_episodio, temporada, fecha_emision,sinopsis, id]
    );
    await conn.end();
    res.status(200).json({ mensaje: "Capitulo modificado", result});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;