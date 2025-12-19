// components/Alert.js
import { $ } from "../utils/dom.js";

// Displays a temporary alert message (success by default, or error if specified)
export function showAlert(message, type = "success") {
  // Get the designated container element in the HTML where alerts should appear
  const container = $("alertContainer");

  // Create a new div element dynamically to hold the alert message
  const el = document.createElement("div");

  // Apply CSS classes (Tailwind CSS) for styling based on the alert type
  el.className = `
    px-6 py-3 rounded-xl shadow-lg text-white font-medium mb-4 transform transition-all duration-300
    ${type === "success" ? 
      "bg-gradient-to-r from-green-500 to-green-600 hover:shadow-green-500/25" : 
      "bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-500/25"
    }
  `;
  
  // Set the actual text content of the alert element
  el.textContent = message;

  // Add slide-in animation
  el.style.transform = "translateY(-10px)";
  el.style.opacity = "0";

  // Add the newly created alert element to the container in the DOM
  container.appendChild(el);
  
  // Animate in
  requestAnimationFrame(() => {
    el.style.transform = "translateY(0)";
    el.style.opacity = "1";
  });
  
  // Set a timer to automatically remove the alert element after 4000 milliseconds (4 seconds)
  setTimeout(() => {
    el.style.transform = "translateY(-10px)";
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
  }, 4000);
}

// ================================
// ENHANCED ALERT TYPES
// ================================

// Module-specific alerts
export function showBookAlert(message, type = "success") {
  showAlert(`📚 ${message}`, type);
}

export function showLibrarianAlert(message, type = "success") {
  showAlert(`👨‍💼 ${message}`, type);
}

export function showBookshelfAlert(message, type = "success") {
  showAlert(`📦 ${message}`, type);
}

// Quick success/error helpers
export function showSuccess(message) {
  showAlert(message, "success");
}

export function showError(message) {
  showAlert(message, "error");
}

// ================================
// BATCH OPERATIONS
// ================================
export function showBulkAlert(message, count, type = "success") {
  const emoji = type === "success" ? "✅" : "❌";
  showAlert(`${emoji} ${message} (${count} items)`, type);
}

// ================================
// PERMANENT ALERTS (for critical errors)
// ================================
export function showPermanentAlert(message, type = "error") {
  const container = $("alertContainer");
  const el = document.createElement("div");

  el.className = `
    px-6 py-3 rounded-xl shadow-lg text-white font-medium mb-4 border-2 border-opacity-50
    ${type === "success" ? 
      "bg-green-500 border-green-400" : 
      "bg-red-500 border-red-400"
    }
  `;
  
  el.innerHTML = `
    <div class="flex items-center justify-between">
      <span>${message}</span>
      <button class="text-white hover:text-gray-200 font-bold text-xl" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  container.appendChild(el);
}
