# controllers/library.py

from core.responses import send_json, send_404
from core.request import parse_json_body
from services.book_service import (
    service_get_all_books,
    service_get_one_book,
    service_create_book,
    service_update_book,
    service_delete_book,
)
def get_all_books(handler):
    """GET /api/books - List all books"""
    books = service_get_all_books()
    return send_books_response(handler, books)


def get_book(handler, book_id):
    """GET /api/books/:id - Get single book"""
    book = service_get_one_book(book_id)
    return send_json(handler, 200, book) if book else send_404(handler)


def create_book(handler):
    """POST /api/books - Create new book"""
    data = parse_json_body(handler)
    new_book = service_create_book(data)
    return send_json(handler, 201, new_book)


def update_book(handler, book_id):
    """PUT /api/books/:id - Update book"""
    data = parse_json_body(handler)
    updated = service_update_book(book_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)


def delete_book(handler, book_id):
    """DELETE /api/books/:id - Delete book"""
    deleted = service_delete_book(book_id)
    return send_json(handler, 200, deleted) if deleted else send_404(handler)

