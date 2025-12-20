// components/bookshelfTable.js
import { $, getState } from "../state/store.js";
import { editBookshelf, deleteBookshelf } from "../controllers/bookshelfController.js";
// ================================
// BOOKSHELVES TABLE RENDERER
// ================================
export function renderBookshelfTable(bookshelves) {
  const body = $("bookshelvesTableBody");
  const noBookshelves = $("noBookshelves");

  body.innerHTML = "";
  
  if (bookshelves.length === 0) {
    noBooks
  }
}