// frontend/assets/js/services/bookService.js

const API_URL = window.ENV.API_BASE_URL;

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all books
export async function apiGetAll() {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch one book by ID
export async function apiGetOne(id) {
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new book
export function apiCreate(data) {
  return fetch(`${API_URL}/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Update a book
export function apiUpdate(id, data) {
  return fetch(`${API_URL}/books/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a book
export function apiDelete(id) {
  return fetch(`${API_URL}/books/${id}`, { method: "DELETE" });
}
