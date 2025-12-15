import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new book
export function resetForm() {
  // Use the native .reset() method on the HTML form element [web:15]
  $("bookForm").reset();

  // Change the submit button text back to "Add Book"
  $("submitBtn").textContent = "Add Book";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected book object (for editing)
export function fillForm(book) {
  // Fill each input field with the corresponding property from the book data [web:3]
  $("title").value = book.title;
  $("author").value = book.author;
  $("isbn").value = book.isbn || "";
  $("category").value = book.category || "";
  $("total_copies").value = book.total_copies ?? 1;
  $("available_copies").value = book.available_copies ?? 1;
  $("published_year").value = book.published_year || "";

  // Change the submit button text to "Update Book"
  $("submitBtn").textContent = "Update Book";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "block";
}
