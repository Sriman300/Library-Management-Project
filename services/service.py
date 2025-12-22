from database.queries import (
    db_get_all_books,
    db_get_one_book,
    db_create_book,
    db_update_book,
    db_delete_book,
    db_get_all_librarians,
    db_get_one_librarian,
    db_create_librarian,
    db_update_librarian,
    db_delete_librarian,
    db_get_all_bookshelves,
    db_get_one_bookshelf,
    db_create_bookshelf,
    db_update_bookshelf,
    db_delete_bookshelf,
)

# -------------------------------
# BOOK SERVICES
# -------------------------------
def service_get_all_books():
    return db_get_all_books()


def service_get_one_book(book_id):
    return db_get_one_book(book_id)


def service_create_book(data):
    return db_create_book(data)


def service_update_book(book_id, data):
    return db_update_book(book_id, data)


def service_delete_book(book_id):
    return db_delete_book(book_id)


# -------------------------------
# LIBRARIAN SERVICES
# -------------------------------
def service_get_all_librarians():
    return db_get_all_librarians()


def service_get_one_librarian(librarian_id):
    return db_get_one_librarian(librarian_id)


def service_create_librarian(data):
    return db_create_librarian(data)


def service_update_librarian(librarian_id, data):
    return db_update_librarian(librarian_id, data)


def service_delete_librarian(librarian_id):
    return db_delete_librarian(librarian_id)


# -------------------------------
# BOOKSHELF SERVICES
# -------------------------------
def service_get_all_bookshelves():
    return db_get_all_bookshelves()


def service_get_one_bookshelf(bookshelf_id):
    return db_get_one_bookshelf(bookshelf_id)


def service_create_bookshelf(data):
    return db_create_bookshelf(data)


def service_update_bookshelf(bookshelf_id, data):
    return db_update_bookshelf(bookshelf_id, data)


def service_delete_bookshelf(bookshelf_id):
    return db_delete_bookshelf(bookshelf_id)
