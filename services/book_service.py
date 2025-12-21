from database.book_queries import (
    db_get_all_books,
    db_get_one_book,
    db_create_book,
    db_update_book,
    db_delete_book,
)

# -------------------------------
# BOOK SERVICES
# -------------------------------
def service_get_all_books():
    return db_get_all("books")


def service_get_one_book(book_id):
    return db_get_one("books", book_id)


def service_create_book(data):
    return db_create("books", data)


def service_update_book(book_id, data):
    return db_update("books", book_id, data)


def service_delete_book(book_id):
    return db_delete("books", book_id)

