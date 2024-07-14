const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://to-do-list-puce-two.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndUpdate(id, { done: true }, { new: true })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.post("/add", (req, res) => {
  const { task } = req.body;
  TodoModel.create({ task, done: false })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete(id)
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
