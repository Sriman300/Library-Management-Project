import { bookshelfService } from "../services/bookshelfServices.js";
import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/bookshelfTable.js";
import { resetForm, fillForm } from "../components/bookshelfForm.js";
import { setState, getState, setEditingBook } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";


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
