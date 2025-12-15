// controllers/BookController.js

import { 
    apiGetAll, 
    apiGetOne, 
    apiCreate, 
    apiUpdate, 
    apiDelete 
} from "../services/bookService.js";

import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/BookTable.js";
import { resetForm, fillForm } from "../components/BookForm.js";

import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Setup event listeners and load initial data
export function initBookController() {
  // Start by fetching and displaying all book data immediately upon load
  loadBooks();

  // --- Handle Form Submissions ---
  $("bookForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      title: $("title").value.trim(),
      author: $("author").value.trim(),
      isbn: $("isbn").value.trim() || null,
      category: $("category").value.trim() || null,
      total_copies: parseInt($("total_copies").value) || 1,
      available_copies: parseInt($("available_copies").value) || 1,
      published_year: $("published_year").value.trim() || null
    };

    const { editingId } = getState();

    editingId
      ? await updateBook(editingId, data)
      : await createNewBook(data);
  });

  // --- Handle Cancel Button Click ---
  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}

// Fetch all book data from the API and update the user interface
export async function loadBooks() {
  const spinner = $("loadingSpinner");
  const table = $("booksTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const books = await apiGetAll();

  setState({ books });
  renderBookTable(books);

  spinner.style.display = "none";
  table.style.display = "block";
}

// Create a new book
export async function createNewBook(data) {
  const res = await apiCreate(data);
  if (res.ok) {
    showAlert("Book added!");
    resetForm();
    loadBooks();
  }
}

// Load a book into the form for editing
export async function editBook(id) {
  const book = await apiGetOne(id);

  setState({ editingId: id });
  fillForm(book);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Update an existing book
export async function updateBook(id, data) {
  const res = await apiUpdate(id, data);
  if (res.ok) {
    showAlert("Book updated!");
    resetForm();
    setState({ editingId: null });
    loadBooks();
  }
}

// Delete a book
export async function deleteBookAction(id) {
  if (!confirm("Delete this book?")) return;

  const res = await apiDelete(id);
  if (res.ok) {
    showAlert("Book deleted!");
    loadBooks();
  }
}
