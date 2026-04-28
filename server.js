const express = require("express");
const mysql = require("mysql2");

const app = express();
app.use(express.json());

// conexão com o banco
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: "root",
  password: "1234",
  database: "dimdim"
});

db.connect(err => {
  if (err) {
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Conectado ao MySQL 🚀");
  }
});

// criar tabela automaticamente
db.query(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
  )
`);

// CREATE
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;
  db.query("INSERT INTO usuarios (nome, email) VALUES (?, ?)",
    [nome, email],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.send("Usuário criado!");
    });
});

// READ
app.get("/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// UPDATE
app.put("/usuarios/:id", (req, res) => {
  const { nome, email } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE usuarios SET nome=?, email=? WHERE id=?",
    [nome, email, id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("Atualizado!");
    }
  );
});

// DELETE
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM usuarios WHERE id=?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.send("Deletado!");
  });
});

app.listen(3000, () => console.log("API rodando na porta 3000"));