// frontend/assets/js/controllers/profilesController.js
import { $ } from "../utils/dom.js";
import { filterList, sortList } from "../utils/listTools.js";
import { exportToCSV, exportToPDF } from "../utils/exportTools.js";

const API_URL = `${window.ENV.API_BASE_URL}/students`;

const COLUMNS = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
];

let allStudents = [];

export function initProfilesController() {
  loadProfiles();

  // Ensure these IDs match your HTML exactly
  $("searchInput")?.addEventListener("input", refresh);
  $("sortBy")?.addEventListener("change", refresh);
  $("sortDir")?.addEventListener("change", refresh);

  $("exportCsvBtn")?.addEventListener("click", () => {
    exportToCSV("students.csv", getRows(), COLUMNS);
  });

  $("exportPdfBtn")?.addEventListener("click", () => {
    const rows = getRows();
    const html = buildPrintableTableHTML("Student Directory", rows, COLUMNS);
    exportToPDF("Student Directory", html);
  });
}

async function loadProfiles() {
  const spinner = $("loadingSpinner");
  const container = $("profilesTableContainer");

  // Fix: Use Tailwind classes to show/hide instead of style.display
  if (spinner) spinner.classList.remove("hidden");
  if (container) container.classList.add("hidden");

  try {
    const res = await fetch(API_URL);
    allStudents = res.ok ? await res.json() : [];
  } catch (error) {
    console.error("Failed to fetch students:", error);
    allStudents = [];
  }

  refresh();

  if (spinner) spinner.classList.add("hidden");
  if (container) container.classList.remove("hidden");
}

function getRows() {
  const q = $("searchInput")?.value?.trim() ?? "";
  const sortKey = $("sortBy")?.value ?? "id";
  const sortDir = $("sortDir")?.value ?? "asc";

  const filtered = filterList(allStudents, q, ["id", "name", "email", "phone"]);
  return sortList(filtered, sortKey, sortDir);
}

function refresh() {
  renderProfilesTable(getRows());
}

function renderProfilesTable(students) {
  const body = $("profilesTableBody");
  const noProfiles = $("noProfiles");

  if (!body) return;
  body.innerHTML = "";

  if (!students || students.length === 0) {
    if (noProfiles) noProfiles.classList.remove("hidden");
    return;
  }

  if (noProfiles) noProfiles.classList.add("hidden");

  students.forEach((s) => {
    const tr = document.createElement("tr");
    // Updated styling to match your rounded UI
    tr.className = "hover:bg-gray-50/50 transition-colors group";

    tr.innerHTML = `
      <td class="px-6 py-4 text-sm text-gray-600">${s.id}</td>
      <td class="px-6 py-4 text-sm">
        <a href="/profiles/${s.id}" data-link class="text-purple-600 hover:text-purple-800 font-semibold">
          ${s.name}
        </a>
      </td>
      <td class="px-6 py-4 text-sm text-gray-600">${s.email}</td>
      <td class="px-6 py-4 text-sm text-gray-600">${s.phone}</td>
      <td class="px-6 py-4 text-right">
        <a href="/profiles/${s.id}" data-link
          class="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs font-bold hover:bg-purple-600 hover:text-white transition-all">
          View Profile
        </a>
      </td>
    `;
    body.appendChild(tr);
  });
}