// frontend/assets/js/router.js

import { initBookController } from "/frontend/assets/js/controllers/bookController.js";

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
  else if (path === "/members") {
    await loadView("/frontend/pages/members.html");
    // initMemberController(); // Future implementation
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
