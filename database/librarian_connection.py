import sqlite3

DB_FILE = "library.db"

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_librarian_database():
    conn = get_connection()
    # ================================
    # LIBRARIANS TABLE
    # ================================
    conn.execute("""
        CREATE TABLE IF NOT EXISTS librarians (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            role TEXT NOT NULL,
            phone TEXT,
            hire_date TEXT,
            salary REAL DEFAULT 0,
            created_at TEXT,
            updated_at TEXT
        )
    """)