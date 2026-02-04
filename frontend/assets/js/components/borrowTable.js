import { $ } from "../utils/dom.js";
import { deleteBorrowAction } from "../controllers/borrowController.js";

export function renderBorrowTable(borrows) {
  const body = $("borrowTableBody");
  const empty = $("noBooksBorrowed");

  body.innerHTML = "";

  if (!borrows || borrows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  borrows.forEach(br => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${br.id}</td>
      <td class="px-3 py-2 border">${br.book_id}</td>
      <td class="px-3 py-2 border">${br.student_id}</td>
      <td class="px-3 py-2 border">${br.librarian_id}</td>
      <td class="px-3 py-2 border">
        <button class="text-red-600 underline" data-del="${br.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteBorrowAction(Number(btn.dataset.del)));
  });
}