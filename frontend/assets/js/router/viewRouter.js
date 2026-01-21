import { initBookController } from "../controllers/bookController.js";
import { initLibrarianController } from "../controllers/librarianController.js";
import { initBookshelfController } from "../controllers/bookshelfController.js";
import { initStudentController } from "../controllers/studentController.js";
import { initProfileController } from "../controllers/profileController.js";
import { initProfilesController } from "../controllers/profilesController.js";
// Load a view into #app container
async function loadView(path) {
  const html = await fetch(path).then(res => res.text());
  document.querySelector("#app").innerHTML = html;
}

// Decide which view to load based on URL
export async function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
    await loadView("/frontend/pages/home.html");
  }

  else if (path === "/books") {
    await loadView("/frontend/pages/books.html");
    initBookController();
  }

    else if (path === "/librarians") {
    await loadView("/frontend/pages/librarian.html");
    initLibrarianController();
  }

    else if (path === "/bookshelves") {
    await loadView("/frontend/pages/bookshelves.html");
    initBookshelfController();
  }
    else if (path === "/students") {
    await loadView("/frontend/pages/student.html");
    initStudentController();
    
  }
  
  // --------------------
  // PROFILES DIRECTORY (list)
  // --------------------
  else if (path === "/profiles") {
    await loadView("/frontend/pages/profiles.html");
    initProfilesController();
    return;
  }

  // --------------------
  // PROFILE PAGE (dynamic): /profiles/:id
  // --------------------
  else if (path.startsWith("/profiles/")) {
    const idStr = path.split("/")[2]; // "/profiles/1" -> "1"
    const id = Number(idStr);

    // If invalid id, show 404
    if (!Number.isInteger(id)) {
      await loadView("/frontend/pages/404.html");
    }

    await loadView("/frontend/pages/profile.html");
    initProfileController(id);
    return;
  }

  else {
    await loadView("/frontend/pages/404.html");
   }
}

// Make links work without page reload
export function initRouterEvents() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });

  // Back/forward buttons support
  window.addEventListener("popstate", router);
}

