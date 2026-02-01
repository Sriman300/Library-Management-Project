from datetime import datetime
from http.server import BaseHTTPRequestHandler
from urllib.parse import urlparse

from controllers.library import (
    get_all_books,
    get_book,
    create_book,
    update_book,
    delete_book,
)

from controllers.library import (
    get_all_librarians,
    get_librarian,
    create_librarian,
    update_librarian,
    delete_librarian,
)

from controllers.library import (
    get_all_bookshelves,
    get_bookshelf,
    create_bookshelf,
    update_bookshelf,
    delete_bookshelf,
)

from controllers.library import (
    get_all_students,
    get_student,
    create_student,
    update_student,
    delete_student,
)

from core.static import serve_static
from core.responses import send_404
from core.middleware import add_cors_headers


FRONTEND_ROUTES = {
    "/",
    "/home",
    "/books",
    "/librarians",
    "/bookshelves",
    "/students",
    "/docs",
    "/profiles",
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

    if path == "/openapi.yaml":
        serve_static(handler, "openapi.yaml")
        return True

    return False


def _parse_id(handler, path):
    """
    Parse the last segment of URL as integer.
    Return None and send 404 if invalid.
    """
    last = path.split("/")[-1]
    if not last.isdigit():
        send_404(handler)
        return None
    return int(last)


class LibraryRouter(BaseHTTPRequestHandler):

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

        # 2. API READ routes
        if path == "/api/books":
            return get_all_books(self)

        if path.startswith("/api/books/"):
            book_id = _parse_id(self, path)
            if book_id is None:
                return
            return get_book(self, book_id)

        if path == "/api/librarians":
            return get_all_librarians(self)

        if path.startswith("/api/librarians/"):
            librarian_id = _parse_id(self, path)
            if librarian_id is None:
                return
            return get_librarian(self, librarian_id)

        if path == "/api/bookshelves":
            return get_all_bookshelves(self)

        if path.startswith("/api/bookshelves/"):
            bookshelf_id = _parse_id(self, path)
            if bookshelf_id is None:
                return
            return get_bookshelf(self, bookshelf_id)

        if path == "/api/students":
            return get_all_students(self)

        if path.startswith("/api/students/"):
            student_id = _parse_id(self, path)
            if student_id is None:
                return
            return get_student(self, student_id)

        return send_404(self)

    # ---------------------------
    # CREATE (POST)
    # ---------------------------
    def do_POST(self):
        if self.path == "/api/books":
            return create_book(self)

        if self.path == "/api/librarians":
            return create_librarian(self)

        if self.path == "/api/bookshelves":
            return create_bookshelf(self)

        if self.path == "/api/students":
            return create_student(self)

        return send_404(self)

    # ---------------------------
    # UPDATE (PUT)
    # ---------------------------
    def do_PUT(self):
        if self.path.startswith("/api/books/"):
            book_id = _parse_id(self, self.path)
            if book_id is None:
                return
            return update_book(self, book_id)

        if self.path.startswith("/api/librarians/"):
            librarian_id = _parse_id(self, self.path)
            if librarian_id is None:
                return
            return update_librarian(self, librarian_id)

        if self.path.startswith("/api/bookshelves/"):
            bookshelf_id = _parse_id(self, self.path)
            if bookshelf_id is None:
                return
            return update_bookshelf(self, bookshelf_id)

        if self.path.startswith("/api/students/"):
            student_id = _parse_id(self, self.path)
            if student_id is None:
                return
            return update_student(self, student_id)

        return send_404(self)

    # ---------------------------
    # DELETE (DELETE)
    # ---------------------------
    def do_DELETE(self):
        if self.path.startswith("/api/books/"):
            book_id = _parse_id(self, self.path)
            if book_id is None:
                return
            return delete_book(self, book_id)

        if self.path.startswith("/api/librarians/"):
            librarian_id = _parse_id(self, self.path)
            if librarian_id is None:
                return
            return delete_librarian(self, librarian_id)

        if self.path.startswith("/api/bookshelves/"):
            bookshelf_id = _parse_id(self, self.path)
            if bookshelf_id is None:
                return
            return delete_bookshelf(self, bookshelf_id)

        if self.path.startswith("/api/students/"):
            student_id = _parse_id(self, self.path)
            if student_id is None:
                return
            return delete_student(self, student_id)

        return send_404(self)

    def log_message(self, format, *args):
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        print(f"[{timestamp}] [Server] {format % args}")
