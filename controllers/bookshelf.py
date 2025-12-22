from core.responses import send_json, send_404
from core.request import parse_json_body
from services.bookshelf_service import (
    service_get_all_bookshelves,
    service_get_one_bookshelf,
    service_create_bookshelf,
    service_update_bookshelf,
    service_delete_bookshelf,
)

def get_all_bookshelves(handler):
    return send_json(handler, 200, service_get_all())


def get_bookshelf(handler, bookshelf_id):
    bookshelf = service_get_one(bookshelf_id)
    return send_json(handler, 200, bookshelf) if bookshelf else send_404(handler)


def create_bookshelf(handler):
    data = parse_json_body(handler)
    new_bookshelf = service_create(data)
    return send_json(handler, 201, new_bookshelf)


def update_bookshelf(handler, bookshelf_id):
    data = parse_json_body(handler)
    updated = service_update(bookshelf_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)


def delete_bookshelf(handler, bookshelf_id):
    deleted = service_delete(bookshelf_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)