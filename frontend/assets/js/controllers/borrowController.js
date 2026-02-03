// frontend/assets/js/controllers/borrowController.js

import { apiGetAll as apiGetAllBorrow, apiCreate, apiDelete } from "../services/borrowService.js";
import { apiGetAll as apiGetAllBooks } from "../services/bookService.js";
import { apiGetAllStudents } from "../services/studentService.js";
import { apiGetAllLibrarians } from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderBorrowTable } from "../components/borrowTable.js";
import { fillDropdowns } from "../components/borrowForm.js";

import { $ } from "../utils/dom.js";

export function initborrowController() {
  loadEverything();

  $("borrowForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      student_id: Number($("student_id").value),
      book_id: Number($("book_id").value),
      librarian_id: Number($("librarian_id").value),
    };

    const res = await apiCreate(data);
    if (res.ok) {
      showAlert("Borrow created!");
      await loadBorrowsOnly();
    } else {
      showAlert("Failed to create borrow", "error");
    }
  });
}

async function loadEverything() {
  await Promise.all([loadStudentsAndBooks(), loadBorrowsOnly()]);
}

async function loadStudentsAndBooks() {
  const [students, books, librarians] = await Promise.all([
    apiGetAllStudents(),
    apiGetAllBooks(),
    apiGetAllLibrarians(),
  ]);

  fillDropdowns(students, books, librarians);
}

async function loadBorrowsOnly() {
  const spinner = $("loadingSpinner");
  const table = $("borrowsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const borrows = await apiGetAllBorrow();
  renderBorrowTable(borrows);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function deleteBorrowAction(id) {
  if (!confirm("Delete this borrow?")) return;

  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Borrow deleted!");
    await loadBorrowsOnly();
  } else {
    showAlert("Failed to delete borrow", "error");
  }
}