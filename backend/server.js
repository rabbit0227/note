const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Note Schema
const noteSchema = new mongoose.Schema({
  title: String,
  text: String,
});

const Note = mongoose.model("Note", noteSchema);

// Routes
app.get("/note", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/note", async (req, res) => {
  const newNote = new Note({
    title: req.body.title,
    text: req.body.text,
  });
  await newNote.save();
  res.status(201).json(newNote);
});

app.delete("/note/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.put("/note/:id", async (req, res) => {
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedNote);
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
