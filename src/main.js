document
  .getElementById("note-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("note-title").value;
    const text = document.getElementById("note-text").value;

    const response = await fetch("http://localhost:5000/note", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, text }),
    });

    const newNote = await response.json();
    addNoteToDOM(newNote);

    document.getElementById("note-form").reset();
  });

async function deleteCard(button) {
  const noteId = button.dataset.id;
  await fetch(`http://localhost:5000/note/${noteId}`, {
    method: "DELETE",
  });
  button.parentElement.remove();
}

async function editCard(button) {
  const card = button.parentElement;
  const noteId = button.dataset.id;
  const title = card.querySelector("h2").innerText;
  const text = card.querySelector("p").innerText;

  document.getElementById("note-title").value = title;
  document.getElementById("note-text").value = text;

  await fetch(`http://localhost:5000/note/${noteId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, text }),
  });

  deleteCard(button);
}

function addNoteToDOM(note) {
  const noteCard = document.createElement("div");
  noteCard.classList.add(
    "bg-white",
    "bg-opacity-30",
    "backdrop-blur-md",
    "p-4",
    "relative",
    "rounded-lg",
    "shadow-lg",
    "border",
    "border-gray-300",
    "mb-4"
  );
  noteCard.dataset.id = note._id;

  noteCard.innerHTML = `
    <h2 class="text-xl font-semibold mb-2">${note.title}</h2>
    <p class="text-gray-700">${note.text}</p>
    <button class="absolute top-2 right-2 text-red-500 hover:text-red-700" data-id="${note._id}" onclick="deleteCard(this)">Delete</button>
    <button class="absolute top-2 right-16 text-blue-500 hover:text-blue-700" data-id="${note._id}" onclick="editCard(this)">Edit</button>
  `;

  document.getElementById("note-container").appendChild(noteCard);
}

async function loadnote() {
  const response = await fetch("http://localhost:5000/note");
  const note = await response.json();
  note.forEach(addNoteToDOM);
}

loadnote();
