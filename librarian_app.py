from http.server import HTTPServer
from librarian_router import LibrarianRouter
from database.librarian_connection import init_librarian_database
def run_server():
    init_librarian_database()
    server = HTTPServer(("", 8000),LibrarianRouter)
    print("🚀 Server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run_server()