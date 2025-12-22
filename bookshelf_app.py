from http.server import HTTPServer
from bookshelf_router import BookshelfRouter
from database.bookshelf_connection import init_bookshelf_database
def run_server():
    init_bookshelf_database()

    server = HTTPServer(("", 8000),BookshelfRouter)
    print("🚀 Server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run_server()