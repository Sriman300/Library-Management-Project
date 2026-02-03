import json
from core.responses import send_json, send_404
from core.request import parse_json_body
from services.book_service import (
    service_get_all_books
    , service_get_one_book
    , service_create_book
    , service_update_book
    , service_delete_book
)
from services.librarian_service import (
    service_get_all_librarians
    , service_get_one_librarian
    , service_create_librarian
    , service_update_librarian
    , service_delete_librarian
)
from services.bookshelf_service import (
    service_get_all_bookshelves
    , service_get_one_bookshelf
    , service_create_bookshelf
    , service_update_bookshelf
    , service_delete_bookshelf
)
from services.profile_service import service_get_borrow_report
from services.student_service import (
    service_get_all_students
    , service_get_one_student
    , service_create_student
    , service_update_student
    , service_delete_student
)

from services.borrow_service import (
    service_get_all_borrows,
    service_get_one_borrow,
    service_create_borrow,
    service_delete_borrow
)
from services.profile_service import (
     service_get_borrow_report
)

def get_all_books(handler):
    return send_json(handler, 200, service_get_all_books())
def get_all_librarians(handler):
    return send_json(handler, 200, service_get_all_librarians())
def get_all_bookshelves(handler):
    return send_json(handler, 200, service_get_all_bookshelves())
def get_all_students(handler):
    return send_json(handler, 200, service_get_all_students())
def get_all_borrows(handler):
    return send_json(handler, 200, service_get_all_borrows())
def get_borrow_report(handler):
    data = service_get_borrow_report()
    return send_json(handler, 200, data)

def get_book(handler, book_id):
    book = service_get_one_book(book_id)
    return send_json(handler, 200, book) if book else send_404(handler)
def get_librarian(handler, librarian_id):
    librarian = service_get_one_librarian(librarian_id)
    return send_json(handler, 200, librarian) if librarian else send_404(handler)
def get_bookshelf(handler, bookshelf_id):
    bookshelf = service_get_one_bookshelf(bookshelf_id)
    return send_json(handler, 200, bookshelf) if bookshelf else send_404(handler)
def get_student(handler, student_id):
    student = service_get_one_student(student_id)
    return send_json(handler, 200, student) if student else send_404(handler)
def get_borrow(handler, borrow_id):
    borrow = service_get_one_borrow(borrow_id)
    return send_json(handler, 200, borrow) if borrow else send_404(handler)

def create_book(handler):
    data = parse_json_body(handler)
    new_book = service_create_book(data)
    return send_json(handler, 201, new_book)
def create_librarian(handler):
    data = parse_json_body(handler)
    new_librarian = service_create_librarian(data)
    return send_json(handler, 201, new_librarian)
def create_bookshelf(handler):
    data = parse_json_body(handler)
    new_bookshelf = service_create_bookshelf(data)
    return send_json(handler, 201, new_bookshelf)
def create_student(handler):
    data = parse_json_body(handler)
    new_student = service_create_student(data)
    return send_json(handler, 201, new_student)
def create_borrow(handler):
    data = parse_json_body(handler)
    new_borrow = service_create_borrow(data)
    return send_json(handler, 201, new_borrow)



def update_book(handler, book_id):
    data = parse_json_body(handler)
    updated = service_update_book(book_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)
def update_librarian(handler, librarian_id):
    data = parse_json_body(handler)
    updated = service_update_librarian(librarian_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)
def update_bookshelf(handler, bookshelf_id):
    data = parse_json_body(handler)
    updated = service_update_bookshelf(bookshelf_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)
def update_student(handler, student_id):
    data = parse_json_body(handler)
    updated = service_update_student(student_id, data)
    return send_json(handler, 200, updated) if updated else send_404(handler)

def delete_book(handler, book_id):
    deleted = service_delete_book(book_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
def delete_librarian(handler, librarian_id):
    deleted = service_delete_librarian(librarian_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
def delete_bookshelf(handler, bookshelf_id):
    deleted = service_delete_bookshelf(bookshelf_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
def delete_student(handler, student_id):
    deleted = service_delete_student(student_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
def delete_borrow(handler, borrow_id):
    deleted = service_delete_borrow(borrow_id)
    return send_json(handler, 200, {"deleted": True}) if deleted else send_404(handler)
