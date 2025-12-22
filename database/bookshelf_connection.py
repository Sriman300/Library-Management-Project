import sqlite3

DB_FILE = "library.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_bookshelf_database():
    conn = get_connection()
    # ================================
    # BOOKSHELVES TABLE
    # ================================
    conn.execute("""
        CREATE TABLE IF NOT EXISTS bookshelves (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            zone TEXT NOT NULL,
            capacity INTEGER DEFAULT 50,
            current_count INTEGER
    )
    """)