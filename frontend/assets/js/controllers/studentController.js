import { 
  apiGetAllStudents, 
  apiGetOneStudent, 
  apiCreateStudent, 
  apiUpdateStudent, 
  apiDeleteStudent 
} from "../services/studentService.js";

import { apiGetAllBooks } from "../services/bookService.js";
import { apiGetAllLibrarians } from "../services/librarianService.js";

import { showAlert } from "../components/Alert.js";
import { renderstudentTable } from "../components/studentTable.js";
import { 
  resetForm, 
  fillForm, 
  fillstudentDropdowns 
} from "../components/studentForm.js";

import { setState, getState } from "../state/store.js";
import { $ } from "../utils/dom.js";


// ============================
// INIT CONTROLLER
// ============================
export async function initStudentController() {
  await loadStudents();
  await loadBookAndLibrarianDropdowns();

  $("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      email: $("email").value.trim(),
      phone: $("phone").value.trim(),
      book_id: $("book_id").value ? Number($("book_id").value) : null,
      librarian_id: $("librarian_id").value ? Number($("librarian_id").value) : null,
    };

    const { editingId } = getState();

    if (editingId) {
      await updateStudent(editingId, data);
    } else {
      await createNewStudent(data);
    }
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}


// ============================
// LOAD STUDENTS
// ============================
export async function loadStudents() {
  const spinner = $("loadingSpinner");
  const table = $("studentsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const students = await apiGetAllStudents();

  setState({ students });
  renderstudentTable(students);

  spinner.style.display = "none";
  table.style.display = "block";
}


// ============================
// LOAD BOOKS + LIBRARIANS
// ============================
async function loadBookAndLibrarianDropdowns() {
  try {
    const [books, librarians] = await Promise.all([
      apiGetAllBooks(),
      apiGetAllLibrarians()
    ]);

    fillstudentDropdowns(books, librarians);

    // Optional UX warnings
    if (!books || books.length === 0) {
      $("noBooks").classList.remove("hidden");
    } else {
      $("noBooks").classList.add("hidden");
    }

    if (!librarians || librarians.length === 0) {
      $("noLibrarians").classList.remove("hidden");
    } else {
      $("noLibrarians").classList.add("hidden");
    }

  } catch (err) {
    console.error("Failed to load books/librarians", err);
    showAlert("Failed to load books or librarians", "error");
  }
}


// ============================
// CREATE STUDENT
// ============================
export async function createNewStudent(data) {
  const res = await apiCreateStudent(data);

  if (res.ok) {
    showAlert("Student added!");
    resetForm();
    await loadStudents();
  } else {
    showAlert("Failed to add student", "error");
  }
}


// ============================
// EDIT STUDENT
// ============================
export async function editStudent(id) {
  const student = await apiGetOneStudent(id);

  setState({ editingId: id });
  fillForm(student);

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ============================
// UPDATE STUDENT
// ============================
export async function updateStudent(id, data) {
  const res = await apiUpdateStudent(id, data);

  if (res.ok) {
    showAlert("Student updated!");
    resetForm();
    setState({ editingId: null });
    await loadStudents();
  } else {
    showAlert("Failed to update student", "error");
  }
}


// ============================
// DELETE STUDENT
// ============================
export async function deleteStudentAction(id) {
  if (!confirm("Delete this student?")) return;

  const res = await apiDeleteStudent(id);

  if (res.ok) {
    showAlert("Student deleted!");
    await loadStudents();
  } else {
    showAlert("Failed to delete student", "error");
  }
}
