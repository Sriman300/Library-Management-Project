import { $ } from "../utils/dom.js";

export function renderBorrowReportTable(rows) {
  const body = $("reportTableBody");
  const empty = $("noRows");

  body.innerHTML = "";

  if (!rows || rows.length === 0) {
    empty.classList.remove("hidden");
    return;
  }
  empty.classList.add("hidden");

  rows.forEach(r => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-3 py-2 border">${r.borrow_id ?? ""}</td>
      <td class="px-3 py-2 border">
        ${r.student_name ?? ""} <span class="text-xs text-gray-500">(ID: ${r.student_id ?? ""})</span>
      </td>
      <td class="px-3 py-2 border">
        ${r.book_title ?? ""} <span class="text-xs text-gray-500">(ID: ${r.book_id ?? ""})</span>
      </td>
      <td class="px-3 py-2 border">
        ${r.librarian_name ?? ""} <span class="text-xs text-gray-500">(ID: ${r.librarian_id ?? ""})</span>
      </td>
    `;
    body.appendChild(tr);
  });
}