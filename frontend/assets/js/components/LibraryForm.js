// components/LibraryForm.js
import { $, createElement } from "../utils/dom.js";

// ================================
// BOOKS FORM HANDLERS
// ================================
export function resetBookForm() {
  $("bookForm").reset();
  $("bookSubmitBtn").textContent = "Add Book";
  $("bookCancelBtn").style.display = "none";
}

export function fillBookForm(book) {
  $("bookTitle").value = book.title || "";
  $("bookAuthor").value = book.author || "";
  $("bookIsbn").value = book.isbn || "";
  $("bookCategory").value = book.category || "";
  $("bookTotalCopies").value = book.total_copies ?? 1;
  $("bookAvailableCopies").value = book.available_copies ?? 1;
  $("bookPublishedYear").value = book.published_year || "";
  
  $("bookSubmitBtn").textContent = "Update Book";
  $("bookCancelBtn").style.display = "block";
}

// ================================
// LIBRARIAN FORM HANDLERS
// ================================
export function resetLibrarianForm() {
  $("librarianForm").reset();
  $("librarianSubmitBtn").textContent = "Add Librarian";
  $("librarianCancelBtn").style.display = "none";
}

export function fillLibrarianForm(librarian) {
  $("librarianName").value = librarian.name || "";
  $("librarianEmail").value = librarian.email || "";
  $("librarianRole").value = librarian.role || "";
  $("librarianPhone").value = librarian.phone || "";
  $("librarianHireDate").value = librarian.hire_date || "";
  $("librarianSalary").value = librarian.salary ?? 0;
  
  $("librarianSubmitBtn").textContent = "Update Librarian";
  $("librarianCancelBtn").style.display = "block";
}

// ================================
// BOOKSHELF FORM HANDLERS
// ================================
export function resetBookshelfForm() {
  $("bookshelfForm").reset();
  $("bookshelfSubmitBtn").textContent = "Add Bookshelf";
  $("bookshelfCancelBtn").style.display = "none";
}

export function fillBookshelfForm(bookshelf) {
  $("bookshelfName").value = bookshelf.name || "";
  $("bookshelfZone").value = bookshelf.zone || "";
  $("bookshelfCapacity").value = bookshelf.capacity ?? 50;
  $("bookshelfCurrentCount").value = bookshelf.current_count ?? 0;
  $("bookshelfLocation").value = bookshelf.location || "";
  
  $("bookshelfSubmitBtn").textContent = "Update Bookshelf";
  $("bookshelfCancelBtn").style.display = "block";
}

// ================================
// UNIVERS
