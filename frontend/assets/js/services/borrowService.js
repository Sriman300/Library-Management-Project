// Base API URL from env.js
const API_URL = `${window.ENV.API_BASE_URL}/borrows`;

// Helper: safely parse JSON or return null
async function safeJson(res) {
  try {
    return await res.json();
  } catch (_) {
    return null;
  }
}

// Fetch all borrows
export async function apiGetAllborrows() {
  const res = await fetch(API_URL);
  if (!res.ok) return [];
  return safeJson(res);
}

// Fetch one borrow by ID
export async function apiGetOneborrow(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) return null;
  return safeJson(res);
}

// Create a new borrow
export function apiCreateborrow(data) {
  return fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

// Delete a borrow
export function apiDeleteborrow(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}