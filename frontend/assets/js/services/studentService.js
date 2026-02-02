// ===============================
// Student API Service
// ===============================

// Ensure ENV exists (prevents undefined base URL bugs)
const API_URL = `${window.ENV.API_BASE_URL}/students`;

// -------------------------------
// Helper: safely parse JSON
// -------------------------------
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

// -------------------------------
// Fetch all students
// -------------------------------
export async function apiGetAllStudents() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      console.error("Failed to fetch students", res.status);
      return [];
    }
    return await safeJson(res);
  } catch (err) {
    console.error("Network error fetching students", err);
    return [];
  }
}

// -------------------------------
// Fetch one student by ID
// -------------------------------
export async function apiGetOneStudent(id) {
  if (!id) return null;

  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) {
      console.error("Failed to fetch student", res.status);
      return null;
    }
    return await safeJson(res);
  } catch (err) {
    console.error("Network error fetching student", err);
    return null;
  }
}

// -------------------------------
// Create a new student
// -------------------------------
export async function apiCreateStudent(data) {
  try {
    return await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        book_id: data.book_id || null,
        librarian_id: data.librarian_id || null
      })
    });
  } catch (err) {
    console.error("Network error creating student", err);
    throw err;
  }
}

// -------------------------------
// Update a student
// -------------------------------
export async function apiUpdateStudent(id, data) {
  if (!id) return null;

  try {
    return await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        book_id: data.book_id || null,
        librarian_id: data.librarian_id || null
      })
    });
  } catch (err) {
    console.error("Network error updating student", err);
    throw err;
  }
}

// -------------------------------
// Delete a student
// -------------------------------
export async function apiDeleteStudent(id) {
  if (!id) return null;

  try {
    return await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (err) {
    console.error("Network error deleting student", err);
    throw err;
  }
}
