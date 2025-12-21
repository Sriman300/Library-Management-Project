from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse
from controllers.bookshelf import (
    get_all_bookshelves, get_bookshelf, create_bookshelf, update_bookshelf, delete_bookshelf,
)
from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers
# -------------------------------
# UI ROUTER (SPA shell + static)
# -------------------------------
FRONTEND_ROUTES = {
    "/", "/home", "/docs",
    "/books", "/librarians", "/bookshelves"
}

def handle_ui_routes(handler, path):
    if path in FRONTEND_ROUTES:
        serve_static(handler, "frontend/pages/index.html")
        return True

    if path.endswith(".html"):
        stripped = path.replace(".html", "")
        if stripped in FRONTEND_ROUTES:
            serve_static(handler, "frontend/pages/index.html")
            return True

    if path.startswith("/frontend/"):
        serve_static(handler, path.lstrip("/"))
        return True


    return False
    # -------------------------------
# MAIN ROUTER CLASS
# -------------------------------
class BookshelfRouter(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(200)
        add_cors_headers(self)
        self.end_headers()

    # ---------------------------
    # READ (GET)
    # ---------------------------
    def do_GET(self):
        path = urlparse(self.path).path

        # 1. UI routes first (SPA)
        if handle_ui_routes(self, path):
            return
            # 5. API READ routes - Bookshelves
        if path == "/api/bookshelves":
            return get_all_bookshelves(self)

        if path.startswith("/api/bookshelves/"):
            bookshelf_id = int(path.split("/")[-1])
            return get_bookshelf(self, bookshelf_id)
            
            return send_404(self)

            # ---------------------------
    # CREATE (POST)
    # ---------------------------
    def do_POST(self):
        if self.path == "/api/bookshelves":
            return create_bookshelf(self)
            return send_404(self)
            # ---------------------------
    # UPDATE (PUT)
    # ---------------------------
    def do_PUT(self):
        if self.path.startswith("/api/bookshelves/"):
            bookshelf_id = int(self.path.split("/")[-1])
            return update_bookshelf(self, bookshelf_id)
            return send_404(self)
            # ---------------------------
    # DELETE (DELETE)
    # ---------------------------
    def do_DELETE(self):
        if self.path.startswith("/api/bookshelves/"):
            bookshelf_id = int(self.path.split("/")[-1])
            return delete_bookshelf(self, bookshelf_id)
            return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [LibraryServer] {format % args}")


