import { $ } from "../utils/dom.js";
import { setState } from "../state/store.js";

// -------------------------------
// Reset the student form
// -------------------------------
export function resetForm() {
  $("studentForm").reset();
  $("cancelBtn").classList.add("hidden");
  $("submitBtn").textContent = "Add Student";
}

// -------------------------------
// Fill form with student data for editing
// -------------------------------
export function fillForm(student) {
  if (!student) return;

  $("name").value = student.name || "";
  $("email").value = student.email || "";
  $("phone").value = student.phone || "";
  $("book_id").value = student.book_id || "";
  $("librarian_id").value = student.librarian_id || "";

  $("cancelBtn").classList.remove("hidden");
  $("submitBtn").textContent = "Update Student";
}

// -------------------------------
// Fill dropdowns for books & librarians
// -------------------------------
export function fillstudentDropdowns(books, librarians) {
  const bookSelect = $("book_id");
  const librarianSelect = $("librarian_id");

  // Clear previous options except default
  bookSelect.querySelectorAll("option:not(:first-child)").forEach(o => o.remove());
  librarianSelect.querySelectorAll("option:not(:first-child)").forEach(o => o.remove());

  // Fill books
  if (books && books.length) {
    books.forEach(book => {
      const option = document.createElement("option");
      option.value = book.id;
      option.textContent = book.title;
      bookSelect.appendChild(option);
    });
  }

  // Fill librarians
  if (librarians && librarians.length) {
    librarians.forEach(librarian => {
      const option = document.createElement("option");
      option.value = librarian.id;
      option.textContent = `${librarian.name}`;
      librarianSelect.appendChild(option);
    });
  }
}
