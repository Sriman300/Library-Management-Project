import { $ } from "../utils/dom.js";
import { deleteBorrowAction } from "../controllers/borrowController.js";

export function renderBorrowTable(borrows) {
  const body = $("borrowTableBody");
  const empty = $("noBorrows");

  body.innerHTML = "";

  if (!borrows || borrows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  borrows.forEach(b => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${b.id}</td>
      <td class="px-3 py-2 border">${b.student_id}</td>
      <td class="px-3 py-2 border">${b.librarian_id}</td>
      <td class="px-3 py-2 border">${b.book_id}</td>
      <td class="px-3 py-2 border">
        <button class="text-red-600 underline" data-del="${b.id}">Delete</button>
      </td>
    `;
    body.appendChild(tr);
  });

  body.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => deleteBorrowAction(Number(btn.dataset.del)));
  });
}