# Starts the API server and initializes the database

from http.server import HTTPServer
from book_router import BookRouter
from librarian_router import LibrarianRouter
from bookshelf_router import BookshelfRouter
from database.connection import init_database

def run_server():
    init_database()
    server = HTTPServer(("", 8000), BookRouter,LibrarianRouter,BookshelfRouter)
    print("🚀 Server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run_server()