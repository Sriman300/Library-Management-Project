import { editStudent, deleteStudentAction } from "../controllers/studentController.js";
import { $ } from "../utils/dom.js";

// -------------------------------
// Render the student table
// -------------------------------
export function renderstudentTable(students) {
  const tbody = $("studentsTableBody");
  const noStudents = $("noStudents");

  // Clear previous rows
  tbody.innerHTML = "";

  if (!students || students.length === 0) {
    noStudents.classList.remove("hidden");
    return;
  } else {
    noStudents.classList.add("hidden");
  }

  students.forEach(student => {
    const tr = document.createElement("tr");
    tr.classList.add("border-b");

    tr.innerHTML = `
      <td class="px-3 py-2">${student.id}</td>
      <td class="px-3 py-2">${student.name}</td>
      <td class="px-3 py-2">${student.email}</td>
      <td class="px-3 py-2">${student.phone}</td>
      <td class="px-3 py-2">${student.book_id}</td>
      <td class="px-3 py-2">${student.librarian_id}</td>
      <td class="px-3 py-2 flex gap-2">
        <button class="editBtn bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
                data-id="${student.id}">
          Edit
        </button>
        <button class="deleteBtn bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                data-id="${student.id}">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  // Attach event listeners for Edit buttons
  tbody.querySelectorAll(".editBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      editStudent(Number(id));
    });
  });

  // Attach event listeners for Delete buttons
  tbody.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      deleteStudentAction(Number(id));
    });
  });
}
