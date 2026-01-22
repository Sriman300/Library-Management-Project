// frontend/assets/js/controllers/profileController.js
import { $ } from "../utils/dom.js";
import { exportProfileToCSV, exportProfileToPDF } from "../utils/exportTools.js";

function show(id, yes) {
  const el = $(id);
  if (!el) return;
  el.classList[yes ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

function normalizeBooks
(rows) {
  return (rows || []).map((r) => ({
    book_id: r.book_id ?? r.id ?? "-",
    book_title: r.book_title ?? "-",
    book_isbn: r.book_isbn ?? r.isbn ?? "-",
    librarian_name: r.librarian_name ?? "-",
    book_cost: r.book_cost ?? "-",
    student_name: r.student_name ?? "-",
    student_phone: r.student_phone ?? "-",
    student_email: r.student_email ?? "-",
    student_id: r.student_id,
  }));
}

const PROFILE_EXPORT_CONFIG = {
  studentFields: [
    { key: "id", label: "Student ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ],
  rowColumns: [
    { key: "book_title", label: "Book" },
    { key: "book_isbn", label: "Isbn" },
    { key: "book_cost", label: "Cost" },
    { key: "librarian_name", label: "Librarian" },
    { key: "student_name", label: "Student" },
    { key: "student_phone", label: "Student" },
    { key: "student_email", label: "Student" },
    { key: "bookshelf_location", label: "Bookshelf" },
  ],
};

export async function initProfileController(studentId) {
  let student = null;
  let books
 = [];

  // Wire export buttons (reuses the util fully)
  $("profileExportCsvBtn")?.addEventListener("click", () => {
    if (!student) return;
    exportProfileToCSV(`student_${student.id}_profile.csv`, student, books, PROFILE_EXPORT_CONFIG);
  });

  $("profileExportPdfBtn")?.addEventListener("click", () => {
    if (!student) return;
    exportProfileToPDF(`Student ${student.id} - Profile`, student, books, PROFILE_EXPORT_CONFIG);
  });

  try {
    show("basicLoading", true);
    show("basicDetails", false);
    show("joinLoading", true);
    show("joinTableContainer", false);
    show("nobooks", false);

    // student
    const studentRes = await fetch(`/api/students/${studentId}`);
    if (!studentRes.ok) throw new Error("Student not found");
    student = await studentRes.json();

    setText("studentId", student.id);
    setText("studentName", student.name);
    setText("studentEmail", student.email);
    setText("studentphone", student.phone);

    show("basicLoading", false);
    show("basicDetails", true);

    // Book report (JOIN)
    const repRes = await fetch(`/api/books`);
    if (!repRes.ok) throw new Error("Report failed");
    const all = await repRes.json();

    books= normalizeBooks
(
      (all || []).filter((r) => Number(r.student_id) === Number(studentId))
    );

    // total
    setText("totalbooks", books.length);

    // render table
    const body = $("joinTableBody");
    if (body) body.innerHTML = "";

    if (!books.length) {
      show("nobooks", true);
    } else {
      books.forEach((r) => {
        const tr = document.createElement("tr");
        tr.className = "border-b";
        tr.innerHTML = `
          <td class="px-3 py-2">${r.book_id}</td>
          <td class="px-3 py-2">${r.book_title}</td>
          <td class="px-3 py-2">${r.book_isbn}</td>
          <td class="px-3 py-2">${r.book_cost}</td>
          <td class="px-3 py-2">${r.librarian_name}</td>
          <td class="px-3 py-2">${r.student_name}</td>
          <td class="px-3 py-2">${r.student_phone}</td>
          <td class="px-3 py-2">${r.student_email}</td>
          <td class="px-3 py-2">${r.bookshelf_location}</td>
        `;
        body?.appendChild(tr);
      });
    }

    show("joinLoading", false);
    show("joinTableContainer", true);
  } catch (err) {
    console.error("[profileController] error:", err);
    show("basicLoading", false);
    show("joinLoading", false);
    show("noBooks", true);
    setText("totalBooks", 0);
  }
}

export default { initProfileController };