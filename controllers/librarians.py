from core.responses import send_json, send_404
from core.request import parse_json_body
from services.book_service import (
    service_get_all_librarians,
    service_get_one_librarian,
    service_create_librarian,
    service_update_librarian,
    service_delete_librarian,
)
def get_all_librarians(handler):
    return send_json(handler, 200, service_get_all())


def get_librarian(handler, librarian_id):
    librarian = service_get_one(librarian_id)
    return send_json(handler, 200, librarian) if librarian else send_404(handler)


def create_librarian(handler):
    data = parse_json_body(handler)
    new_librarian = service_create(data)
    return send_json(handler, 201, new_librarian)


def update_librarian(handler, librarian_id):
    data = parse_json_body(handler)
    updated = service_update(librarian_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)


def delete_librarian(handler, librarian_id):
    deleted = service_delete(librarian_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)