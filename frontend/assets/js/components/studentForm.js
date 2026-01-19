import { $, createElement } from "../utils/dom.js";

// Resets the input form to its default state for creating a new student
export function resetForm() {
  // Use the native .reset() method on the HTML form element
  $("studentForm").reset();

  // Change the submit button text back to "Add Student"
  $("submitBtn").textContent = "Add student";

  // Hide the "Cancel" button, as we are no longer in 'edit' mode
  $("cancelBtn").style.display = "none";
}

// Populates the input form fields with data from a selected student object (for editing)
export function fillForm(student) {
  // Fill each input field with the corresponding property from the student data
  $("name").value = student.name;
  $("email").value = student.email;
  $("phone").value = student.phone;
  $("cost").value = student.cost;

  // Change the submit button text to "Update student"
  $("submitBtn").textContent = "Update Student";

  // Show the "Cancel" button, allowing the user to exit 'edit' mode
  $("cancelBtn").style.display = "inline-block";
}
