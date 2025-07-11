const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Load notes from localStorage on page load
window.addEventListener("DOMContentLoaded", showNotes);

function showNotes() {
  notesContainer.innerHTML = "";
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.forEach((noteText, idx) => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    inputBox.innerText = noteText;
    img.src = "assets/delete.png";
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      deleteNote(idx);
    });
    inputBox.appendChild(img);
    inputBox.addEventListener("input", () => updateNote(idx, inputBox.innerText));
    notesContainer.appendChild(inputBox);
  });
}

function saveNotes() {
  let notes = [];
  document.querySelectorAll(".input-box").forEach(note => {
    notes.push(note.innerText.replace(/\n$/, ""));
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function updateNote(idx, text) {
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes[idx] = text;
  localStorage.setItem("notes", JSON.stringify(notes));
}

function deleteNote(idx) {
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.splice(idx, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

createBtn.addEventListener("click", () => {
  let notes = JSON.parse(localStorage.getItem("notes") || "[]");
  notes.push("");
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
});
