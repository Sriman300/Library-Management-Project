from database.queries import (
    db_get_all_bookshelves,
    db_get_one_bookshelf,
    db_create_bookshelf,
    db_update_bookshelf,
    db_delete_bookshelf,
)
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
