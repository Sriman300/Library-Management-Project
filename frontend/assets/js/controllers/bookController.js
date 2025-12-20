// controllers/bookController.js
import { bookService } from "../services/bookService.js";
import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/bookTable.js";
import { resetForm, fillForm } from "../components/bookForm.js";
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

