import { initLibraryController } from "./controllers/libraryController.js";
import { router } from "./router/viewRouter.js";
window.addEventListener("DOMContentLoaded", () => {
  router();
  initStudentController();


});