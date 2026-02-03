// frontend/assets/js/controllers/borrowController.js

import { apiGetAllBorrows, 
         apiCreateBorrow, 
         apiDeleteBorrow } from "../services/borrowService.js";
import { apiGetAllBooks } from "../services/bookService.js";
import { apiGetAllStudents } from "../services/studentService.js";
import { apiGetAllLibrarians } from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderBorrowTable } from "../components/borrowTable.js";
import { fillDropdowns } from "../components/borrowForm.js";

import { $ } from "../utils/dom.js";

export function initBorrowController() {
  loadEverything();

  $("borrowForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      student_id: Number($("student_id").value),
      book_id: Number($("book_id").value),
      librarian_id: Number($("librarian_id").value),
    };

    const res = await apiCreateBorrow(data);
    if (res.ok) {
      showAlert("Borrow created!");
      await loadBorrowsOnly();
    } else {
      showAlert("Failed to create borrow", "error");
    }
  });
}

async function loadEverything() {
  await Promise.all([loadStudentsBooksAndLibrarians(), loadBorrowsOnly()]);
}

async function loadStudentsBooksAndLibrarians() {
  const [books, students, librarians] = await Promise.all([
    apiGetAllBooks(),
    apiGetAllStudents(),
    apiGetAllLibrarians(),
  ]);

  fillDropdowns(books, students, librarians);
}

async function loadBorrowsOnly() {
  const spinner = $("loadingSpinner");
  const table = $("borrowsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const borrows = await apiGetAllBorrows();
  renderBorrowTable(borrows);

  spinner.style.display = "none";
  table.style.display = "block";
}

export async function deleteBorrowAction(id) {
  if (!confirm("Delete this borrow?")) return;

  const res = await apiDeleteBorrow(id);
  if (res.ok) {
    showAlert("Borrow deleted!");
    await loadBorrowsOnly();
  } else {
    showAlert("Failed to delete borrow", "error");
  }
}