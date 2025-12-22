# Starts the API server and initializes the database

from http.server import HTTPServer
from book_router import BookRouter
from database.book_connection import init_book_database
def run_server():
    init_book_database()
    server = HTTPServer(("", 8000), BookRouter)
    print("🚀 Server running at http://localhost:8000")
    server.serve_forever()

if __name__ == "__main__":
    run_server()