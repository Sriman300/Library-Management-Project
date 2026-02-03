import { $ } from "../utils/dom.js";

export function fillDropdowns(books, students, librarians) {
  const bookSel = $("book_id");
  const studentSel = $("student_id");
  const librarianSel = $("librarian_id");

  bookSel.innerHTML = `<option value="">Select Book</option>`;
  studentSel.innerHTML = `<option value="">Select Student</option>`;
  librarianSel.innerHTML = `<option value="">Select Librarian</option>`;

  (books || []).forEach(b => {
    const opt = document.createElement("option");
    opt.value = b.id;
    opt.textContent = `${b.title} (ID: ${b.id})`;
    bookSel.appendChild(opt);
  });

  (students || []).forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (ID: ${s.id})`;
    studentSel.appendChild(opt);
  });
  
  (librarians || []).forEach(l => {
    const opt = document.createElement("option");
    opt.value = l.id;
    opt.textContent = `${l.name} (ID: ${l.id})`;
    librarianSel.appendChild(opt);
  });
}