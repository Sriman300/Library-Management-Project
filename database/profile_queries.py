from datetime import datetime
from .connection import get_connection

def borrow_report():
    """
    Returns joined rows: students, books, librarians
    """
    conn = get_connection()
    rows = conn.execute("""
        SELECT
            s.id as student_id,
            s.name as student_name,
            s.email as student_email,
            s.phone as student_phone,
                        

            b.id AS book_id,
            b.title AS book_title,
            b.author AS book_author,
            b.isbn AS book_isbn,
            b.cost AS book_cost,            

            l.id AS librarian_id,
            l.name AS librarian_name,
                        
        FROM borrows b
        JOIN students s ON s.id = b.student_id
        JOIN books b ON b.id = b.book_id
        JOIN librarians l ON l.id = b.librarian_id
        ORDER BY s.id DESC;
    """).fetchall()
    conn.close()
    return [dict(r) for r in rows]