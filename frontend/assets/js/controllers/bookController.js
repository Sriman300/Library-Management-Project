// controllers/bookController.js
import { bookService } from "../services/libraryServices.js";
import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/LibraryTable.js";
import { resetForm, fillForm } from "../components/LibraryForm.js";
import { setState, getState, setEditingBook } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

export function initBookController() {
  loadBooks();

  $("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = getFormData("book");
    const { editingBookId } = getState();
    
    editingBookId
      ? await updateBook(editingBookId, data)
      : await createNewBook(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setEditingBook(null);
    resetForm("book");
  });
}

export async function loadBooks() {
  showLoading(true);
  const books = await bookService.getAll();
  setState({ books });
  renderBookTable(books, "books");
  showLoading(false);
}

export async function createNewBook(data) {
  const res = await bookService.create(data);
  if (res.ok) {
    showAlert("Book added successfully!");
    resetForm("book");
    loadBooks();
  }
}

export async function editBook(id) {
  const book = await bookService.getOne(id);
  setEditingBook(id);
  fillForm(book, "book");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export async function updateBook(id, data) {
  const res = await bookService.update(id, data);
  if (res.ok) {
    showAlert("Book updated successfully!");
    resetForm("book");
    setEditingBook(null);
    loadBooks();
  }
}

export async function deleteBook(id) {
  if (!confirm("Delete this book permanently?")) return;
  const res = await bookService.delete(id);
  if (res.ok) {
    showAlert("Book deleted successfully!");
    loadBooks();
  }
}

// ================================
// controllers/librarianController.js
// ================================
import { librarianService } from "../services/libraryServices.js";

export function initLibrarianController() {
  loadLibrarians();

  $("librarianForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = getFormData("librarian");
    const { editingLibrarianId } = getState();
    
    editingLibrarianId
      ? await updateLibrarian(editingLibrarianId, data)
      : await createNewLibrarian(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setEditingLibrarian(null);
    resetForm("librarian");
  });
}

export async function loadLibrarians() {
  showLoading(true);
  const librarians = await librarianService.getAll();
  setState({ librarians });
  renderBookTable(librarians, "librarians");
  showLoading(false);
}

export async function createNewLibrarian(data) {
  const res = await librarianService.create(data);
  if (res.ok) {
    showAlert("Librarian added successfully!");
    resetForm("librarian");
    loadLibrarians();
  }
}

export async function editLibrarian(id) {
  const librarian = await librarianService.getOne(id);
  setEditingLibrarian(id);
  fillForm(librarian, "librarian");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export async function updateLibrarian(id, data) {
  const res = await librarianService.update(id, data);
  if (res.ok) {
    showAlert("Librarian updated successfully!");
    resetForm("librarian");
    setEditingLibrarian(null);
    loadLibrarians();
  }
}

export async function deleteLibrarian(id) {
  if (!confirm("Delete this librarian permanently?")) return;
  const res = await librarianService.delete(id);
  if (res.ok) {
    showAlert("Librarian deleted successfully!");
    loadLibrarians();
  }
}

// ================================
// controllers/bookshelfController.js
// ================================
import { bookshelfService } from "../services/libraryServices.js";

export function initBookshelfController() {
  loadBookshelves();

  $("bookshelfForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = getFormData("bookshelf");
    const { editingBookshelfId } = getState();
    
    editingBookshelfId
      ? await updateBookshelf(editingBookshelfId, data)
      : await createNewBookshelf(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setEditingBookshelf(null);
    resetForm("bookshelf");
  });
}

export async function loadBookshelves() {
  showLoading(true);
  const bookshelves = await bookshelfService.getAll();
  setState({ bookshelves });
  renderBookTable(bookshelves, "bookshelves");
  showLoading(false);
}

export async function createNewBookshelf(data) {
  const res = await bookshelfService.create(data);
  if (res.ok) {
    showAlert("Bookshelf added successfully!");
    resetForm("bookshelf");
    loadBookshelves();
  }
}

export async function editBookshelf(id) {
  const bookshelf = await bookshelfService.getOne(id);
  setEditingBookshelf(id);
  fillForm(bookshelf, "bookshelf");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export async function updateBookshelf(id, data) {
  const res = await bookshelfService.update(id, data);
  if (res.ok) {
    showAlert("Bookshelf updated successfully!");
    resetForm("bookshelf");
    setEditingBookshelf(null);
    loadBookshelves();
  }
}

export async function deleteBookshelf(id) {
  if (!confirm("Delete this bookshelf permanently?")) return;
  const res = await bookshelfService.delete(id);
  if (res.ok) {
    showAlert("Bookshelf deleted successfully!");
    loadBookshelves();
  }
}
