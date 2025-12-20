import { librarianService } from "../services/librarianServices.js";
import { showAlert } from "../components/Alert.js";
import { renderBookTable } from "../components/librarianTable.js";
import { resetForm, fillForm } from "../components/librarianForm.js";
import { setState, getState, setEditingBook } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";


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