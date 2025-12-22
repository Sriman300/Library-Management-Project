from datetime import datetime
from .connection import get_connection


# ================================
# BOOKS QUERIES
# ================================
def db_get_all_books():
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM books ORDER BY id DESC"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one_book(book_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM books WHERE id = ?",
        (book_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create_book(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute(
        """
        INSERT INTO books (
            title, author, isbn, category,
            total_copies, available_copies,
            published_year, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data["title"],
            data["author"],
            data.get("isbn"),
            data.get("category"),
            data.get("total_copies", 1),
            data.get("available_copies", 1),
            data.get("published_year"),
            now,
        )
    )

    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_book(new_id)


def db_update_book(book_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()

    conn.execute(
        """
        UPDATE books
        SET title = ?, author = ?, isbn = ?, category = ?,
            total_copies = ?, available_copies = ?,
            published_year = ?, updated_at = ?
        WHERE id = ?
        """,
        (
            data["title"],
            data["author"],
            data.get("isbn"),
            data.get("category"),
            data.get("total_copies", 1),
            data.get("available_copies", 1),
            data.get("published_year"),
            now,
            book_id,
        )
    )

    conn.commit()
    conn.close()
    return db_get_one_book(book_id)


def db_delete_book(book_id):
    book = db_get_one_book(book_id)
    if not book:
        return None

    conn = get_connection()
    conn.execute(
        "DELETE FROM books WHERE id = ?",
        (book_id,)
    )
    conn.commit()
    conn.close()
    return book


# ================================
# LIBRARIANS QUERIES
# ================================
def db_get_all_librarians():
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM librarians ORDER BY id DESC"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one_librarian(librarian_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM librarians WHERE id = ?",
        (librarian_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create_librarian(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute(
        """
        INSERT INTO librarians (
            name, email, role, phone,
            hire_date, salary, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data["name"],
            data["email"],
            data["role"],
            data.get("phone"),
            data.get("hire_date"),
            data.get("salary", 0),
            now,
        )
    )

    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_librarian(new_id)


def db_update_librarian(librarian_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()

    conn.execute(
        """
        UPDATE librarians
        SET name = ?, email = ?, role = ?, phone = ?,
            hire_date = ?, salary = ?, updated_at = ?
        WHERE id = ?
        """,
        (
            data["name"],
            data["email"],
            data["role"],
            data.get("phone"),
            data.get("hire_date"),
            data.get("salary", 0),
            now,
            librarian_id,
        )
    )

    conn.commit()
    conn.close()
    return db_get_one_librarian(librarian_id)


def db_delete_librarian(librarian_id):
    librarian = db_get_one_librarian(librarian_id)
    if not librarian:
        return None

    conn = get_connection()
    conn.execute(
        "DELETE FROM librarians WHERE id = ?",
        (librarian_id,)
    )
    conn.commit()
    conn.close()
    return librarian


# ================================
# BOOKSHELVES QUERIES
# ================================
def db_get_all_bookshelves():
    conn = get_connection()
    rows = conn.execute(
        "SELECT * FROM bookshelves ORDER BY id DESC"
    ).fetchall()
    conn.close()
    return [dict(r) for r in rows]


def db_get_one_bookshelf(bookshelf_id):
    conn = get_connection()
    row = conn.execute(
        "SELECT * FROM bookshelves WHERE id = ?",
        (bookshelf_id,)
    ).fetchone()
    conn.close()
    return dict(row) if row else None


def db_create_bookshelf(data):
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute(
        """
        INSERT INTO bookshelves (
            name, zone, capacity,
            current_count, location, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            data["name"],
            data["zone"],
            data.get("capacity", 50),
            data.get("current_count", 0),
            data.get("location"),
            now,
        )
    )

    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_bookshelf(new_id)


def db_update_bookshelf(bookshelf_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()

    conn.execute(
        """
        UPDATE bookshelves
        SET name = ?, zone = ?, capacity = ?,
            current_count = ?, location = ?, updated_at = ?
        WHERE id = ?
        """,
        (
            data["name"],
            data["zone"],
            data.get("capacity", 50),
            data.get("current_count", 0),
            data.get("location"),
            now,
            bookshelf_id,
        )
    )

    conn.commit()
    conn.close()
    return db_get_one_bookshelf(bookshelf_id)


def db_delete_bookshelf(bookshelf_id):
    bookshelf = db_get_one_bookshelf(bookshelf_id)
    if not bookshelf:
        return None

    conn = get_connection()
    conn.execute(
        "DELETE FROM bookshelves WHERE id = ?",
        (bookshelf_id,)
    )
    conn.commit()
    conn.close()
    return bookshelf
