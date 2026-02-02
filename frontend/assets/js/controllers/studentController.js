import { 
  apiGetAllStudents, 
  apiGetOneStudent, 
  apiCreateStudent, 
  apiUpdateStudent, 
  apiDeleteStudent 
} from "../services/studentService.js";

import { showAlert } from "../components/Alert.js";
import { renderStudentTable } from "../components/studentTable.js";
import { resetForm, fillForm, fillstudentDropdowns } from "../components/studentForm.js";
import { setState, getState } from "../state/store.js";
import { $, createElement } from "../utils/dom.js";

// Initialize the main logic and set up all necessary event listeners
export function initStudentController() {
  loadStudents();

  $("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: $("name").value.trim(),
      email: $("email").value.trim(),
      phone: $("phone").value.trim(),
      book_id:$("book_id").value.trim(),
      librarian_id:$("librarian_id").value.trim(),
     
    };

    const { editingId } = getState();

    editingId
      ? await updateStudent(editingId, data)
      : await createNewStudent(data);
  });

  $("cancelBtn").addEventListener("click", () => {
    setState({ editingId: null });
    resetForm();
  });
}


// Fetch all student data from the API and update the user interface
export async function loadStudents() {
  const spinner = $("loadingSpinner");
  const table = $("studentsTableContainer");

  spinner.style.display = "block";
  table.style.display = "none";

  const students = await apiGetAllStudents();

  setState({ students });
  renderStudentTable(students);

  spinner.style.display = "none";
  table.style.display = "block";
}


// Create a new student
export async function createNewStudent(data) {
  const res = await apiCreateStudent(data);
  if (res.ok) {
    showAlert("student added!");
    resetForm();
    loadStudents();
  }
}


// Load a student into the form for editing
export async function editStudent(id) {
  const student = await apiGetOneStudent(id);

  setState({ editingId: id });
  fillForm(student);

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// Update an existing student
export async function updateStudent(id, data) {
  const res = await apiUpdateStudent(id, data);
  if (res.ok) {
    showAlert("Updated!");
    resetForm();
    setState({ editingId: null });
    loadStudents();
  }
}


// Delete a student
export async function deleteStudentAction(id) {
  if (!confirm("Delete this student?")) return;

  const res = await apiDeleteStudent(id);
  if (res.ok) {
    showAlert("Deleted!");
    loadStudents();
  }
}
