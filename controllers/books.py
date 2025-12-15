# controllers/books.py

import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.book_service import (
    service_get_all,
    service_get_one,
    service_create,
    service_update,
    service_delete,
)

def get_all_books(handler):
    return send_json(handler, 200, service_get_all())

def get_book(handler, book_id):
    book = service_get_one(book_id)
    return send_json(handler, 200, book) if book else send_404(handler)

def create_book(handler):
    data = parse_json_body(handler)
    new_book = service_create(data)
    return send_json(handler, 201, new_book)

def update_book(handler, book_id):
    data = parse_json_body(handler)
    updated = service_update(book_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_book(handler, book_id):
    deleted = service_delete(book_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
