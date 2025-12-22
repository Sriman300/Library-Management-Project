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
    return db_get_all("books")


def service_get_one_book(book_id):
    return db_get_one("books", book_id)


def service_create_book(data):
    return db_create("books", data)


def service_update_book(book_id, data):
    return db_update("books", book_id, data)


def service_delete_book(book_id):
    return db_delete("books", book_id)

# -------------------------------
# LIBRARIAN SERVICES
# -------------------------------
def service_get_all_librarians():
    return db_get_all("librarians")


def service_get_one_librarian(librarian_id):
    return db_get_one("librarians", librarian_id)


def service_create_librarian(data):
    return db_create("librarians", data)


def service_update_librarian(librarian_id, data):
    return db_update("librarians", librarian_id, data)


def service_delete_librarian(librarian_id):
    return db_delete("librarians", librarian_id)
    # -------------------------------
# BOOKSHELF SERVICES
# -------------------------------
def service_get_all_bookshelves():
    return db_get_all("bookshelves")


def service_get_one_bookshelf(bookshelf_id):
    return db_get_one("bookshelves", bookshelf_id)


def service_create_bookshelf(data):
    return db_create("bookshelves", data)


def service_update_bookshelf(bookshelf_id, data):
    return db_update("bookshelves", bookshelf_id, data)


def service_delete_bookshelf(bookshelf_id):
    return db_delete("bookshelves", bookshelf_id)
