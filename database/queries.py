# database/queries.py

from datetime import datetime
from .connection import get_connection

def db_get_all():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM books ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one(book_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM books WHERE id = ?", (book_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create(data):
    conn = get_connection()
    now = datetime.now().isoformat()
    cur = conn.execute(
        """INSERT INTO books (title, author, isbn, category, total_copies, 
           available_copies, published_year, created_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)""",
        (data["title"], data["author"], data.get("isbn"), data.get("category"), 
         data.get("total_copies", 1), data.get("available_copies", 1), 
         data.get("published_year"), now)
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one(new_id)

def db_update(book_id, data):
    conn = get_connection()
    now = datetime.now().isoformat()
    conn.execute("""
        UPDATE books SET title=?, author=?, isbn=?, category=?, total_copies=?, 
        available_copies=?, published_year=?, updated_at=?
        WHERE id=?
    """, (data["title"], data["author"], data.get("isbn"), data.get("category"), 
          data.get("total_copies", 1), data.get("available_copies", 1), 
          data.get("published_year"), now, book_id))
    conn.commit()
    conn.close()
    return db_get_one(book_id)

def db_delete(book_id):
    book = db_get_one(book_id)
    if not book:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM books WHERE id=?", (book_id,))
    conn.commit()
    conn.close()
    return book
