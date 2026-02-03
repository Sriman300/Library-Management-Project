# backend/database/borrow_queries.py

from datetime import datetime
from .connection import get_connection

def db_get_all_borrows():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM borrows ORDER BY id DESC").fetchall()
    conn.close()
    return [dict(r) for r in rows]

def db_get_one_borrow(borrow_id):
    conn = get_connection()
    row = conn.execute("SELECT * FROM borrows WHERE id = ?", (borrow_id,)).fetchone()
    conn.close()
    return dict(row) if row else None

def db_create_borrow(data):
    """
    Create a new borrow record.
    Expected data:
      - book_id (int)
      - student_id (int)
      - librarian_id (int)
    """
    conn = get_connection()
    now = datetime.now().isoformat()

    cur = conn.execute(
        "INSERT INTO borrows (book_id, student_id, librarian_id, created_at) VALUES (?, ?, ?, ?)",
        (
            data.get("book_id"),
            data.get("student_id"),
            data.get("librarian_id"),
            now
        )
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return db_get_one_borrow(new_id)

def db_delete_borrow(borrow_id):
    borrow = db_get_one_borrow(borrow_id)
    if not borrow:
        return None

    conn = get_connection()
    conn.execute("DELETE FROM borrows WHERE id=?", (borrow_id,))
    conn.commit()
    conn.close()
    return borrow


