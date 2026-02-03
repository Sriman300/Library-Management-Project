// frontend/assets/js/controllers/profileController.js
import { $ } from "../utils/dom.js";
import { exportProfileToCSV, exportProfileToPDF } from "../utils/exportTools.js";

// Utility functions
function show(id, visible) {
  const el = $(id);
  if (!el) return;
  el.classList[visible ? "remove" : "add"]("hidden");
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value ?? "";
}

// Normalize borrows and extract all possible fields
function normalizeBorrows(rows) {
  return (rows || []).map((r) => ({
    book_id: r.book_id ?? r.id ?? "-",
    book_title: r.book_title ?? r.title ?? "-",
    book_isbn: r.book_isbn ?? r.isbn ?? "-",
    book_author: r.book_author ?? r.author ?? "-",
    book_cost: r.book_cost ?? "-",
    librarian_id: r.librarian_id ?? r.librarian?.id ?? "-",
    librarian_name: r.librarian_name ?? "-",
    student_id: r.student_id ?? r.student?.id ?? "-",
    student_name: r.student_name ?? r.student?.name ?? "-",
    student_phone: r.student_phone ?? r.student?.phone ?? "-",
    student_email: r.student_email ?? r.student?.email ?? "-",
    student_id:
      r.student_id ??
      r.studentId ??
      r.student?.id ??
      r.borrower_id ??
      r.user_id ??
      "-",
  }));
}

// Export configuration
const PROFILE_EXPORT_CONFIG = {
  studentFields: [
    { key: "id", label: "Student ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
  ],
  rowColumns: [
    { key: "borrow_id", label: "Borrow ID" },
    { key: "book_title", label: "Book Title" },
    { key: "book_isbn", label: "Book ISBN" },
    { key: "book_author", label: "Book Author" },
    { key: "book_cost", label: "Book Cost" },
    { key: "librarian_name", label: "Librarian Name" },
    { key: "student_name", label: "Student Name" },
    { key: "student_phone", label: "Student Phone" },
    { key: "student_email", label: "Student Email" },
  ],
};

// Main controller
export async function initProfileController(studentId) {
  let student = null;
  let borrows = [];

  // Export buttons
  $("profileExportCsvBtn")?.addEventListener("click", () => {
    if (!student) return;
    exportProfileToCSV(
      `student_${student.id}_profile.csv`,
      student,
      borrows,
      PROFILE_EXPORT_CONFIG
    );
  });

  $("profileExportPdfBtn")?.addEventListener("click", () => {
    if (!student) return;
    exportProfileToPDF(
      `Student ${student.id} - Profile`,
      student,
      borrows,
      PROFILE_EXPORT_CONFIG
    );
  });

  try {
    // Show loaders
    show("basicLoading", true);
    show("basicDetails", false);
    show("joinLoading", true);
    show("joinTableContainer", false);
    show("noBorrows", false);

    // Fetch student
    const studentRes = await fetch(`/api/students/${studentId}`);
    if (!studentRes.ok) throw new Error("Student not found");
    student = await studentRes.json();

    setText("studentId", student.id);
    setText("studentName", student.name);
    setText("studentEmail", student.email);
    setText("studentPhone", student.phone);

    show("basicLoading", false);
    show("basicDetails", true);

    // Fetch all Borrows
    const borrowsRes = await fetch(`/api/borrows`);
    if (!borrowsRes.ok) throw new Error("Borrows API failed");
    const allBorrows = await borrowsRes.json();
    console.log("Fetched borrows:", allBorrows);

    // Filter borrows for this student using all possible ID fields
    borrows = normalizeBorrows(
      (allBorrows || []).filter((r) => {
        const possibleIds = [
          r.student_id,
          r.studentId,
          r.student?.id,
          r.borrower_id,
          r.user_id,
        ];

        const id = possibleIds.find((x) => x != null && !isNaN(Number(x)));
        const matches = Number(id) === Number(studentId);

        if (matches) {
          console.log("[Borrow Matched]", { borrow: r, usedField: id, studentId });
        }

        return matches;
      })
    );

    //total
    setText("totalBorrows", borrows.length);

    // Render table
    const body = $("joinTableBody");
    if (body) body.innerHTML = "";

    if (!borrows.length) {
      show("noBorrows", true);
    } else {
      borrows.forEach((r) => {
        const tr = document.createElement("tr");
        tr.className = "border-b";
        tr.innerHTML = `
          <td class="px-3 py-2">${r.book_id}</td>
          <td class="px-3 py-2">${r.book_title}</td>
          <td class="px-3 py-2">${r.book_isbn}</td>
          <td class="px-3 py-2">${r.book_cost}</td>
          <td class="px-3 py-2">${r.book_author}</td>
          <td class="px-3 py-2">${r.librarian_id}</td>
          <td class="px-3 py-2">${r.librarian_name}</td>
          <td class="px-3 py-2">${r.student_id}</td>
          <td class="px-3 py-2">${r.student_name}</td>
          <td class="px-3 py-2">${r.student_phone}</td>
          <td class="px-3 py-2">${r.student_email}</td>
        `;
        body.appendChild(tr);
      });
      show("noBorrows", false);
    }

    show("joinLoading", false);
    show("joinTableContainer", true);
  } catch (err) {
    console.error("[profileController] error:", err);
    show("basicLoading", false);
    show("joinLoading", false);
    show("noBorrows", true);
    setText("totalBorrows", 0);
  }
}

export default { initProfileController };
