// backend/models/note.js
const mongoose = require("mongoose");

// Define the Note schema
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

// Create and export the Note model
const Note = mongoose.model("Note", noteSchema);
module.exports = Note;
